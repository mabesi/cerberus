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

}