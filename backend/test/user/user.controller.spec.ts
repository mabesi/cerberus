import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../../src/user/user.controller";
import { newUserMock, blockedUserMock, activeUserMock, userServiceMock } from "./user.service.mock";
import { prismaMock } from "../db.mock";
import { users } from "commons/data";
import { UserDTO } from "src/user/user.dto";
import { Status } from "commons/models/status";
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { authServiceMock } from "../../test/auth/auth.service.mock";

describe("UserController Tests", () => {

    let userController: UserController;

    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [userServiceMock, authServiceMock]
        }).compile();

        userController = moduleFixture.get<UserController>(UserController);
    })

    it("Should be defined", () => {
        expect(UserController).toBeDefined();
    })
    
    it("Should get user", async () => {
        const result = await userController.getUser("fakeauthorization", activeUserMock.address);
        expect(result.address).toEqual(activeUserMock.address);
    })

    it("Should update user", async () => {
        const result = await userController.updateUser("fakeauthorization", activeUserMock.id, {...activeUserMock} as UserDTO);
        expect(result.id).toEqual(activeUserMock.id);
    })

    it("Should pay user", async () => {
        const result = await userController.pay("fakeauthorization");
        expect(result.status).toEqual(Status.ACTIVE);
    })

})