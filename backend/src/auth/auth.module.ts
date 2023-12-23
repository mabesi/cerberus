import { Module } from "@nestjs/common";
import { AuthController } from "./authController";
import { UserService } from "../user/user.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [UserService]
})
export class AuthModule {

}