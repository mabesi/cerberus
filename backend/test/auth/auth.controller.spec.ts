import { Test, TestingModule } from "@nestjs/testing";
import { authServiceMock, jwtMock } from "./auth.service.mock";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { AuthController } from "../../src/auth/auth.controller";
import { bannedUserMock, userServiceMock } from "../../test/user/user.service.mock";
import { mailerServiceMock } from "./mailer.service.mock";
import { AuthDTO } from "../../src/auth/auth.dto";
import { UserDTO } from "../../src/user/user.dto";
import { ChainId } from "commons/models/chainId";
import { Status } from "commons/models/status";

jest.mock("ethers", () => {
    return {
        ethers: {
            verifyMessage: (message: string, secret: string) => {
                if (!message || !secret) throw new Error();
                return "0x123456";
            }
        }
    }
})

describe("AuthController Tests", () => {

    const authDto = {
        secret: "abc123",
        timestamp: Date.now(),
        wallet: "0x123456"
    } as AuthDTO

    const userDto = {
        address: "0x123456",
        name: "Plinio Mabesi",
        email: "contato@gmail.com",
        id: "abc123",
        activationCode: "123456",
        activationDate: new Date(),
        network: ChainId.MAINNET,
        planId: "Gold",
        privateKey: "abc123",
        status: Status.NEW,
    } as UserDTO;    

    let authController: AuthController;

    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [userServiceMock, authServiceMock, mailerServiceMock]
        }).compile();

        authController = moduleFixture.get<AuthController>(AuthController);
    })

    it("Should be defined", () => {
        expect(AuthController).toBeDefined();
    })

    it("Should signin", async () => {
        const result = await authController.signin(authDto);
        expect(result).toEqual("abc123");
    })

    it("Should NOT signin (outdated)", async () => {
        const oneHourAgo = Date.now() - (60 * 60 * 1000);

        await expect(authController.signin({...authDto, timestamp: oneHourAgo}))
            .rejects
            .toEqual(new BadRequestException(`Timestamp too old.`));
    })

    it("Should NOT signin (invalid secret)", async () => {
        await expect(authController.signin({...authDto, secret: null!}))
            .rejects
            .toEqual(new BadRequestException(`Invalid secret.`));
    })

    it("Should NOT signin (wrong wallet)", async () => {
        await expect(authController.signin({...authDto, wallet: "0x987654"}))
            .rejects
            .toEqual(new UnauthorizedException("Wallet and secret doesn't match."));
    })

    it("Should NOT signin (banned user)", async () => {
        userServiceMock.useValue.getUserByWallet.mockResolvedValue(bannedUserMock);

        await expect(authController.signin({...authDto}))
            .rejects
            .toEqual(new UnauthorizedException("Banned user."));
    })
    
    it("Should signup", async () => {
        const result = await authController.signup(userDto);
        expect(result.status).toEqual(Status.NEW);
    })
    
    it("Should activate", async () => {
        const result = await authController.activate(userDto.address, "123456");
        expect(result).toEqual("abc123");
    })
    
})