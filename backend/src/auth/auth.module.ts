import { Module } from "@nestjs/common";
import { AuthController } from "./authController";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: []
})
export class AuthModule {

}