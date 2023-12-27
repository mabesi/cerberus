import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../src/user/user.service";
import { newUserMock, blockedUserMock, activeUserMock } from "./user.service.mock";
import { prismaMock } from "./db.mock";
import { users } from "commons/data";
import { UserDTO } from "src/user/user.dto";
import { Status } from "commons/models/status";

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
        prismaMock.users.findFirst.mockResolvedValue({...newUserMock} as users);
        
        const result = await userService.getUserByWallet(newUserMock.address);
        expect(result.address).toEqual(newUserMock.address);
    })

    it("Should get user by id", async () => {
        prismaMock.users.findUnique.mockResolvedValue({...newUserMock} as users);

        const result = await userService.getUser(newUserMock.id);
        expect(result.id).toEqual(newUserMock.id);
    })

    it("Should add user", async () => {
        prismaMock.users.create.mockResolvedValue({...newUserMock} as users);

        const result = await userService.addUser({...newUserMock} as UserDTO);
        expect(result.id).toBeTruthy();
    })

    it("Should pay user", async () => {
        prismaMock.users.update.mockResolvedValue({...activeUserMock} as users);
        prismaMock.users.findFirst.mockResolvedValue({...blockedUserMock} as users);

        const result = await userService.payUser(blockedUserMock.address);
        expect(result.status).toEqual(Status.ACTIVE);
    })

    it("Should update user", async () => {
        prismaMock.users.update.mockResolvedValue({...activeUserMock} as users);

        const result = await userService.updateUser(newUserMock.id, {...newUserMock} as UserDTO);
        expect(result.status).toEqual(Status.ACTIVE);
    })

    it("Should activate user", async () => {
        prismaMock.users.update.mockResolvedValue({...blockedUserMock} as users);
        prismaMock.users.findFirst.mockResolvedValue({...newUserMock} as users);

        const result = await userService.activateUser(newUserMock.id, newUserMock.activationCode);
        expect(result.status).toEqual(Status.BLOCKED);
    })

})