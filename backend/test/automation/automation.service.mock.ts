import Automation from "commons/models/automation";
import { AutomationService } from "../../src/automation/automation.service";

export const newAutomationMock = {
    id: "automation123",
    name: "Automation Test",
    userId: "user123",
    poolId: "pool123",
    isActive: true,
    isOpened: false,
    nextAmount: "10",
    openCondition: {
        field: "price0",
        operator: "==",
        value: "0"
    },
    closeCondition: {
        field: "price0",
        operator: "==",
        value: "0"
    },
    pnl: 10,
    tradeCount: 10
} as Automation;

export const activeAutomationMock = {
    ...newAutomationMock,
    isActive: true
} as Automation;

export const inactiveAutomationMock = {
    ...newAutomationMock,
    isActive: false
} as Automation;

export const automationServiceMock = {
    provide: AutomationService,
    useValue: {
        getAutomation: jest.fn().mockResolvedValue(activeAutomationMock),
        getAutomations: jest.fn().mockResolvedValue([activeAutomationMock]),
        getActiveAutomations: jest.fn().mockResolvedValue([activeAutomationMock]),
        addAutomation: jest.fn().mockResolvedValue(activeAutomationMock),
        updateAutomation: jest.fn().mockResolvedValue(activeAutomationMock),
        deleteAutomation: jest.fn().mockResolvedValue(activeAutomationMock),
        startAutomation: jest.fn().mockResolvedValue(activeAutomationMock),
        stopAutomation: jest.fn().mockResolvedValue(inactiveAutomationMock),
    }
}