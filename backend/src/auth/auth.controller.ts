import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AuthDTO } from "./auth.dto";
import { UserDTO } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { User } from "commons/models/user";
import { MailerService } from "@nestjs-modules/mailer";
import Config from "../config";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly mailerService: MailerService
        ) {

    }

    @Post("signin")
    signin(@Body() data: AuthDTO): object {
        return data;
    }

    @Post("signup")
    async signup(@Body() data: UserDTO): Promise<User> {

        const user = await this.userService.addUser(data);

        await this.mailerService.sendMail({
            to: user.email,
            subject: `Activate your user on Cerberus`,
            text: `Hi, ${user.name}!

            Use the link below to finish your signup (copy and paste if the link doesn't work):

            ${Config.SITE_URL}/activate?wallet=${user.address}&code=${user.activationCode}

            Or if you are with the activation page opened, use the code below:

            ${user.activationCode}

            See ya!
            Cerberus Admin
            `
        });
        
        return user;
    }

    @Post("activate/:wallet/:code")
    async activate(@Param("wallet") wallet: string, @Param("code", ParseIntPipe) code: string): Promise<string> {

        const user = await this.userService.activateUser(wallet, code.toString());

        await this.mailerService.sendMail({
            to: user.email,
            subject: `User Activated, next steps in this email`,
            text: `Hi, ${user.name}!

            Your user is activated. But before start bot trading, you need to pay the first month in advance.

            Use the link below to make your payment (copy and paste if the link doesn't work):

            ${Config.SITE_URL}/pay/${user.address}

            Or if you are with the website opened, just click in login button again.

            See ya!
            Cerberus Admin
            `
        });

        //TODO: gerar o JWT

        return "tokenjwt";
    }

}