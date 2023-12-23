import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {

    @Post("signin")
    signin(@Body() data): object {
        return data;
    }

    @Post("signup")
    signup(@Body() data): object {
        return data;
    }

    @Post("activate/:wallet/:code")
    activate(@Param("wallet") wallet, @Param("code") code): object {
        return {
            wallet,
            code
        };
    }

}