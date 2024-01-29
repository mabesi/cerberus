import { Test, TestingModule } from "@nestjs/testing";
import { activeAutomationMock, inactiveAutomationMock, newAutomationMock } from "./automation.service.mock";
import { prismaMock } from "../db.mock";
import { automations } from "commons/data";
import { AutomationService } from "../../src/automation/automation.service";
import { AutomationDTO } from "../../src/automation/automation.dto";

describe("AutomationService Tests", () => {

    const userId = "user123";
    let automationService: AutomationService;

    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [AutomationService]
        }).compile();

        automationService = moduleFixture.get<AutomationService>(AutomationService);
    })

    it("Should be defined", () => {
        expect(automationService).toBeDefined();
    })

    it("Should get automation", async () => {
        prismaMock.automations.findFirst.mockResolvedValue({ ...newAutomationMock } as automations);

        const result = await automationService.getAutomation("automation123", userId);
        expect(result).toBeDefined();
        expect(result!.id).toEqual(newAutomationMock.id);
    })

    it("Should get automations", async () => {
        prismaMock.automations.findMany.mockResolvedValue([{ ...newAutomationMock }] as automations[]);

        const result = await automationService.getAutomations(userId);
        expect(result).toBeDefined();
        expect(result[0].id).toEqual(newAutomationMock.id);
    })

    it('Should get active automations', async () => {
        prismaMock.automations.findMany.mockResolvedValue([{ ...activeAutomationMock } as automations]);

        const automations = await automationService.getActiveAutomations(userId);

        expect(automations.length).toEqual(1);
    });

    it('Should get top automations', async () => {
        prismaMock.automations.findMany.mockResolvedValue([{ ...activeAutomationMock } as automations]);

        const automations = await automationService.getTopAutomations(userId);

        expect(automations.length).toEqual(1);
    });

    it('Should add an automation', async () => {
        prismaMock.automations.create.mockResolvedValue(newAutomationMock as automations);

        const automation = { ...newAutomationMock } as AutomationDTO;
        const result = await automationService.addAutomation(userId, automation);

        expect(result.id).toBeTruthy();
    });

    it('Should add an automation (inactive)', async () => {
        prismaMock.automations.create.mockResolvedValue(newAutomationMock as automations);

        const automation = { ...inactiveAutomationMock } as AutomationDTO;
        const result = await automationService.addAutomation(userId, automation);

        expect(result.id).toBeTruthy();
    });

    it('Should start an automation', async () => {
        prismaMock.automations.findFirst.mockResolvedValue({ ...inactiveAutomationMock } as automations);
        prismaMock.automations.update.mockResolvedValue({ ...activeAutomationMock } as automations);

        const result = await automationService.startAutomation(newAutomationMock.id!, userId);

        expect(result.id).toEqual(inactiveAutomationMock.id);
        expect(result.isActive).toBeTruthy();
    });

    it('Should stop an automation', async () => {
        prismaMock.automations.findFirst.mockResolvedValue({ ...activeAutomationMock } as automations);
        prismaMock.automations.update.mockResolvedValue({ ...inactiveAutomationMock } as automations);

        const result = await automationService.stopAutomation(newAutomationMock.id!, userId);

        expect(result.id).toEqual(inactiveAutomationMock.id);
        expect(result.isActive).toBeFalsy();
    });

    it('Should update an automation', async () => {
        prismaMock.automations.update.mockResolvedValue({ ...newAutomationMock } as automations);

        const result = await automationService.updateAutomation(newAutomationMock.id!, userId, { ...newAutomationMock } as AutomationDTO);
        expect(result.id).toEqual(newAutomationMock.id);
    });

    it('Should update an automation (inactive)', async () => {
        prismaMock.automations.update.mockResolvedValue({ ...inactiveAutomationMock } as automations);

        const result = await automationService.updateAutomation(inactiveAutomationMock.id!, userId, { ...inactiveAutomationMock } as AutomationDTO);
        expect(result.id).toEqual(inactiveAutomationMock.id);
    });

    it('Should delete an automation', async () => {
        prismaMock.automations.delete.mockResolvedValue({ ...newAutomationMock } as automations);

        const result = await automationService.deleteAutomation(newAutomationMock.id!, userId);
        expect(result.id).toEqual(newAutomationMock.id);
    });
})