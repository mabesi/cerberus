import { Body, Controller, Get, Headers, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { AuthDTO } from "../auth/auth.dto";
import { UserDTO } from "./user.dto";
import { UserService } from "./user.service";
import { User } from "commons/models/user";
import { MailerService } from "@nestjs-modules/mailer";
import Config from "../config";

@Controller("users")
export class UserController {

    constructor(
        private readonly userService: UserService,
        ) {

    }

    @Post("pay")
    async pay(@Headers("Authorization") authorization) {
        //TODO: token decode
        
        return this.userService.payUser("");
    }

    @Get(":identifier")
    async getUser(@Headers("Authorization") authorization, @Param("identifier") identifier: string) {

        //TODO: token decode

        if (identifier.startsWith("0x")) {
            //TODO: verificar JWT x identifier
            return this.userService.getUserByWallet(identifier);
        } else {
            //TODO: verificar JWT x identifier
            const user = await this.userService.getUser(identifier);
            user.privateKey = "";
            return user;
        }

    }

    @Patch(":id")
    async updateUser(@Headers("Authorization") authorization, @Param("id") id: string, @Body() user: UserDTO) {

        //TODO: token decode

        //TODO: verificar JWT x identifier

        return this.userService.updateUser(id, user);
    }

}