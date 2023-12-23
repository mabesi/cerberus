import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "commons/models/user";
import dbConnection from "../db";
import { UserDTO } from "./user.dto";
import { Status } from "commons/models/status";
import Config from "../config";

@Injectable()
export class UserService {

    static generateActivationCode(len: number) : string {

        const validChars = "0123456789";
        let code = "";
        for (let i=0; i<len; i++) {
            code += validChars[Math.floor(Math.random() * 10)];
        }

        return code;
    }

    async getUserByWallet(address: string) : Promise<User> {
        
        const db = await dbConnection();
        
        const user = await db.users.findFirst({
            where: {
                address: {
                    equals: address,
                    mode: "insensitive"
                }
            }
        })

        user.privateKey = "";
        
        return user;
    }

    async getUser(id: string): Promise<User> {
        
        const db = await dbConnection();
        
        const user = await db.users.findUnique({
            where: {id}
        })

        //TODO: decriptografar a private key
        //user.privateKey = "";
        
        return user;
    }

    async addUser(user: UserDTO) : Promise<User> {
        
        const db = await dbConnection();
        
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
        
        const db = await dbConnection();
        
        const data: any = {
            address: user.address,
            email: user.email,
            name: user.name,
            status: Status.NEW,
        }

        if (user.privateKey) {
            data.privateKey = ""; //TODO: criptografar nova private key
        }

        const updatedUser = await db.users.update({
            where: { id },
            data
        });

        updatedUser.privateKey = "";

        return updatedUser;
    }

    async payUser(address: string) : Promise<User> {

        const user = await this.getUserByWallet(address);

        if (!user) throw new NotFoundException();
        if (user.status !== Status.BLOCKED) throw new ForbiddenException();

        const db = await dbConnection();

        //TODO: pay via blockchain

        const updateUser = await db.users.update({
            where: {id: user.id},
            data: { status: Status.ACTIVE }
        })

        updateUser.privateKey = "";

        return updateUser;
    }

    async activateUser(wallet: string, code: string) : Promise<User> {

        const user = await this.getUserByWallet(wallet);
        if (!user) throw new NotFoundException();
        if (user.status !== Status.NEW) return user;
        if (user.activationCode !== code)
            throw new UnauthorizedException(`Wrong activation code.`);

        const tenMinutesAgo = new Date(Date.now() - (10 * 60 * 1000));

        if (user.activationDate < tenMinutesAgo)
            throw new UnauthorizedException(`Activation code expired.`);

        const db = await dbConnection();

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