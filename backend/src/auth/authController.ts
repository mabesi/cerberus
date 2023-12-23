import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AuthDTO } from "./auth.dto";
import { UserDTO } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { User } from "commons/models/user";

@Controller("auth")
export class AuthController {

    constructor(private readonly userService: UserService) {

    }

    @Post("signin")
    signin(@Body() data: AuthDTO): object {
        return data;
    }

    @Post("signup")
    async signup(@Body() data: UserDTO): Promise<User> {

        const user = await this.userService.addUser(data);

        //TODO: enviar email de confirmação
        
        return user;
    }

    @Post("activate/:wallet/:code")
    activate(@Param("wallet") wallet: string, @Param("code", ParseIntPipe) code: number): object {
        return {
            wallet,
            code
        };
    }

}