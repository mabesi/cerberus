import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "commons/models/user";
import dbConnection from "../db";
import { UserDTO } from "./user.dto";
import { Status } from "commons/models/status";
import Config from "../config";

@Injectable()
export class UserService {

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
                        activationCode: "0", //TODO: gerar novo código
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
                activationCode: "", //TODO: gerar código
                activationDate: new Date(),
                privateKey: "",
                status: Status.NEW,
                network: Config.CHAIN_ID
            }
        })
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

        updateUser.privateKey = ""

        return updateUser;
    }

}