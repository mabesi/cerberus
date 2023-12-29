import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "commons/models/user";
import db from "../db";
import { UserDTO } from "./user.dto";
import { Status } from "commons/models/status";
import Config from "../config";
import { encrypt, decrypt } from "commons/services/cryptoService";
import { pay } from "commons/services/cerberusPayService";

@Injectable()
export class UserService {

    static isHex(text: string, ) : boolean {
        const reg=/[0-9A-Fa-f]{6,24}/g;
        return reg.test(text);
    }

    static generateActivationCode(len: number) : string {

        const validChars = "0123456789";
        let code = "";
        for (let i=0; i<len; i++) {
            code += validChars[Math.floor(Math.random() * 10)];
        }

        return code;
    }

    async getUserByWallet(address: string) : Promise<User> {
        
        const user = await db.users.findFirst({
            where: {
                address: {
                    equals: address,
                    mode: "insensitive"
                }
            }
        })

        if (!user) throw new NotFoundException();

        user.privateKey = "";
        
        return user;
    }

    async getUser(id: string): Promise<User> {
        
        if (!UserService.isHex(id)) throw new BadRequestException(`Invalid hex identifier.`);

        const user = await db.users.findUnique({
            where: {id}
        })

        if (!user) throw new NotFoundException();

        user.privateKey = decrypt(user.privateKey);
        
        return user;
    }

    async addUser(user: UserDTO) : Promise<User> {
        
        const oldUser = await db.users.findFirst({
            where: {
                OR: [
                    { address: user.address },
                    { email: user.email }
                ]
            }
        })

        if (oldUser) {
            if (oldUser.status !== Status.NEW)
                throw new ConflictException(`User already exists with the same wallet or email.`);
            else {
                return db.users.update({
                    where: { id: oldUser.id},
                    data: {
                        activationCode: UserService.generateActivationCode(6),
                        activationDate: new Date()
                    }
                })
            }
        }

        return db.users.create({
            data: {
                address: user.address,
                email: user.email,
                name: user.name,
                planId: user.planId,
                activationCode: UserService.generateActivationCode(6),
                activationDate: new Date(),
                privateKey: "",
                status: Status.NEW,
                network: Config.CHAIN_ID
            }
        })
    }

    async updateUser(id: string, user: UserDTO) : Promise<User> {
        
        const data: any = {
            address: user.address,
            email: user.email,
            name: user.name,
        }

        if (user.privateKey) {
            data.privateKey = encrypt(user.privateKey);
        }

        const updatedUser = await db.users.update({
            where: { id },
            data
        });

        if (updatedUser) updatedUser.privateKey = "";

        return updatedUser;
    }

    async payUser(address: string) : Promise<User> {

        const user = await this.getUserByWallet(address);

        if (user.status !== Status.BLOCKED) throw new ForbiddenException();

        await pay(user.address);

        const updatedUser = await db.users.update({
            where: {id: user.id},
            data: { status: Status.ACTIVE }
        })

        updatedUser.privateKey = "";

        return updatedUser;
    }

    async activateUser(wallet: string, code: string) : Promise<User> {

        const user = await this.getUserByWallet(wallet);

        if (user.status !== Status.NEW) return user;

        if (user.activationCode !== code)
            throw new UnauthorizedException(`Wrong activation code.`);

        const tenMinutesAgo = new Date(Date.now() - (10 * 60 * 1000));

        if (user.activationDate < tenMinutesAgo)
            throw new UnauthorizedException(`Activation code expired.`);

        const updatedUser = await db.users.update({
            where: {id: user.id},
            data: {
                status: Status.BLOCKED
            }
        })

        updatedUser.privateKey = "";

        return updatedUser;
    }

}