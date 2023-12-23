import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";

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
    activate(@Param("wallet") wallet: string, @Param("code", ParseIntPipe) code: number): object {
        return {
            wallet,
            code
        };
    }

}