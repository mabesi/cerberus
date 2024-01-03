import { Injectable, NotFoundException } from "@nestjs/common";
import Automation from "commons/models/automation";
import db from "../db";
import { Prisma } from "commons/data";
import { AutomationDTO } from "./automation.dto";

@Injectable()
export class AutomationService {

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

}