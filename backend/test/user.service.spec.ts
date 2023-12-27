import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../src/user/user.service";
import { newUserMock, blockedUserMock, activeUserMock } from "./user.service.mock";
import { prismaMock } from "./db.mock";
import { users } from "commons/data";
import { UserDTO } from "src/user/user.dto";
import { Status } from "commons/models/status";
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";

describe("UserService Tests", () => {

    let userService: UserService;

    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [UserService]
        }).compile();

        userService = moduleFixture.get<UserService>(UserService);
    })

    it("Should be defined", () => {
        expect(UserService).toBeDefined();
    })

    it("Should get user by wallet", async () => {
        prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock } as users);

        const result = await userService.getUserByWallet(newUserMock.address);
        expect(result.address).toEqual(newUserMock.address);
    })

    it("Should NOT get user by wallet (not found)", async () => {
        prismaMock.users.findFirst.mockResolvedValue(null);
        
        await expect(userService.getUserByWallet(newUserMock.address))
            .rejects
            .toEqual(new NotFoundException());
    })

    it("Should get user by id", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ ...newUserMock } as users);

        const result = await userService.getUser(newUserMock.id);
        expect(result.id).toEqual(newUserMock.id);
    })

    it("Should NOT get user by id (not found)", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);

        await expect(userService.getUser(newUserMock.id))
            .rejects
            .toEqual(new NotFoundException());
    })

    it("Should NOT get user by id (invalid hex id)", async () => {
        await expect(userService.getUser("efg123"))
            .rejects
            .toEqual(new BadRequestException(`Invalid hex identifier.`));
    })

    it("Should add user", async () => {
        prismaMock.users.create.mockResolvedValue({ ...newUserMock } as users);

        const result = await userService.addUser({ ...newUserMock } as UserDTO);
        expect(result.id).toBeTruthy();
    })

    it("Should NOT add user (update instead)", async () => {
        prismaMock.users.update.mockResolvedValue({ ...newUserMock, activationCode: "654321", activationDate: new Date() } as users);
        prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock } as users);

        const result = await userService.addUser({ ...newUserMock } as UserDTO);
        expect(result.activationCode).not.toEqual(newUserMock.activationCode);
        expect(result.activationDate.getTime()).toBeGreaterThan(newUserMock.activationDate.getTime());
    })

    it("Should NOT add user (conflict)", async () => {
        prismaMock.users.findFirst.mockResolvedValue({ ...activeUserMock } as users);

        await expect(userService.addUser({ ...newUserMock } as UserDTO))
            .rejects
            .toEqual(new ConflictException(`User already exists with the same wallet or email.`));
    })

    it("Should pay user", async () => {
        prismaMock.users.update.mockResolvedValue({ ...activeUserMock } as users);
        prismaMock.users.findFirst.mockResolvedValue({ ...blockedUserMock } as users);

        const result = await userService.payUser(blockedUserMock.address);
        expect(result.status).toEqual(Status.ACTIVE);
    })

    it("Should NOT pay user (active user)", async () => {
        prismaMock.users.findFirst.mockResolvedValue({ ...activeUserMock } as users);

        await expect(userService.payUser(blockedUserMock.address))
        .rejects
        .toEqual(new ForbiddenException());
    })

    it("Should update user", async () => {
        prismaMock.users.update.mockResolvedValue({ ...activeUserMock } as users);

        const result = await userService.updateUser(newUserMock.id, { ...newUserMock } as UserDTO);
        expect(result.status).toEqual(Status.ACTIVE);
    })

    it("Should activate user", async () => {
        prismaMock.users.update.mockResolvedValue({ ...blockedUserMock } as users);
        prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock } as users);

        const result = await userService.activateUser(newUserMock.address, newUserMock.activationCode);
        expect(result.status).toEqual(Status.BLOCKED);
    })

    it("Should NOT activate user (wrong code)", async () => {
        prismaMock.users.update.mockResolvedValue({ ...blockedUserMock } as users);
        prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock, activationCode: "098765" } as users);

        await expect(userService.activateUser(newUserMock.address, newUserMock.activationCode))
            .rejects
            .toEqual(new UnauthorizedException(`Wrong activation code.`));        
    })

    it("Should NOT activate user (code expired)", async () => {
        const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));

        prismaMock.users.update.mockResolvedValue({ ...blockedUserMock } as users);
        prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock, activationDate: oneHourAgo } as users);

        await expect(userService.activateUser(newUserMock.address, newUserMock.activationCode))
            .rejects
            .toEqual(new UnauthorizedException(`Activation code expired.`));        
    })

    it("Should NOT activate user (activated)", async () => {
        prismaMock.users.findFirst.mockResolvedValue({ ...activeUserMock } as users);

        const result = await userService.activateUser(activeUserMock.address, activeUserMock.activationCode);
        expect(result.status).toEqual(Status.ACTIVE);       
    })

})