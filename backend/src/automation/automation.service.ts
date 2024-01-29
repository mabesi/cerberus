import { Injectable, NotFoundException } from "@nestjs/common";
import Automation from "commons/models/automation";
import db from "../db";
import { Prisma } from "commons/data";
import { AutomationDTO } from "./automation.dto";

@Injectable()
export class AutomationService {

    async getAutomation(id: string, userId: string) : Promise<Automation | null> {
        return db.automations.findFirst({
            where: {
                id,
                userId
            }
        })
    }

    async getAutomations(userId: string, page: number = 1, pageSize: number = 20) : Promise<Automation[]> {
        return db.automations.findMany({
            where: {
                userId
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        })
    }

    async getTopAutomations(userId: string) : Promise<Automation[]> {
        return db.automations.findMany({
            where: {
                userId
            },
            take: 5,
            orderBy: { pnl: "desc" }
        })
    }

    async getActiveAutomations(userId: string) : Promise<Automation[]> {
        return db.automations.findMany({
            where: {
                userId,
                isActive: true
            }
        })
    }

    async addAutomation(userId: string, automation: AutomationDTO) : Promise<Automation> {
        return db.automations.create({
            data: {
                exchange: automation.exchange,
                network: automation.network,
                openCondition: automation.openCondition,
                closeCondition: automation.closeCondition,
                isActive: automation.isActive || false,
                isOpened: automation.isOpened || false, 
                name: automation.name,
                nextAmount: automation.nextAmount,
                poolId: automation.poolId,
                userId
            }
        })
    }

    async updateAutomation(id: string, userId: string, automation: AutomationDTO) : Promise<Automation> {
        return db.automations.update({
            where: {
                id,
                userId
            },
            data: {
                exchange: automation.exchange,
                network: automation.network,
                openCondition: automation.openCondition,
                closeCondition: automation.closeCondition,
                isActive: automation.isActive || false,
                isOpened: automation.isOpened || false, 
                name: automation.name,
                nextAmount: automation.nextAmount,
                poolId: automation.poolId,
            }
        })
    }

    async startAutomation(id: string, userId: string) : Promise<Automation> {
        return db.automations.update({
            where: {
                id,
                userId
            },
            data: {
                isActive: true
            }
        })
    }

    async stopAutomation(id: string, userId: string) : Promise<Automation> {
        return db.automations.update({
            where: {
                id,
                userId
            },
            data: {
                isActive: false
            }
        })
    }

    async deleteAutomation(id: string, userId: string) : Promise<Automation> {
        return db.automations.delete({
            where: {
                id,
                userId
            }
        })
    }

}