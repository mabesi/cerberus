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
    
    it("Should get user by wallet", async () => {
        const result = await userController.getUser("fakeauthorization", activeUserMock.address);
        expect(result.address).toEqual(activeUserMock.address);
    })

    it("Should NOT get user by wallet", async () => {
        await expect(userController.getUser("fakeauthorization", "0x987654"))
        .rejects
        .toEqual(new ForbiddenException());
    })

    it("Should get user by id", async () => {
        const result = await userController.getUser("fakeauthorization", activeUserMock.id);
        expect(result.id).toEqual(activeUserMock.id);
    })

    it("Should NOT get user by id", async () => {
        await expect(userController.getUser("fakeauthorization", "789abc"))
        .rejects
        .toEqual(new ForbiddenException());
    })

    it("Should update user", async () => {
        const result = await userController.updateUser("fakeauthorization", activeUserMock.id, {...activeUserMock} as UserDTO);
        expect(result.id).toEqual(activeUserMock.id);
    })

    it("Should NOT update user (id doesn't match)", async () => {
        await expect(userController.updateUser("fakeauthorization", "987abc", {...activeUserMock} as UserDTO))
        .rejects
        .toEqual(new ForbiddenException());
    })

    it("Should pay user", async () => {
        const result = await userController.pay("fakeauthorization");
        expect(result.status).toEqual(Status.ACTIVE);
    })

})