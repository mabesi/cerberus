import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../src/user/user.service";

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

})