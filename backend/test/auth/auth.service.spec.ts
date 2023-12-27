import { Test, TestingModule } from "@nestjs/testing";
import { jwtServiceMock } from "./jwt.service.mock";
import { AuthService } from "../../src/auth/auth.service";
import { jwtMock } from "./auth.service.mock";
import { UnauthorizedException } from "@nestjs/common";

describe("AuthService Tests", () => {

    let authService: AuthService;

    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [AuthService, jwtServiceMock],
        }).compile();

        authService = moduleFixture.get<AuthService>(AuthService);
    })

    it("Should be defined", () => {
        expect(AuthService).toBeDefined();
    })

    it("Should create token", async () => {
        const result = await authService.createToken(jwtMock);
        expect(result).toBeTruthy();
    })

    it("Should decode token", async () => {
        const result = await authService.decodeToken("abc123");
        expect(result.userId).toEqual(jwtMock.userId);
    })
    
    it("Should check token", async () => {
        const result = await authService.checkToken("abc123");
        expect(result).toBeTruthy();
    })

    it("Should NOT check token (null)", async () => {
        await expect(authService.checkToken(null!))
            .rejects
            .toEqual(new UnauthorizedException("Invalid JWT."));        
    })

    
})