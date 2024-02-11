import CFG from "./config";
import Pool from "commons/models/pool";
import Automation from "commons/models/automation";
import automationsRepository from "./repositories/automationsRepository";
import usersRepository from "./repositories/usersRepository";
import { swap } from "commons/services/uniswapService";
import sendMail from "./services/mailService";
import tradesRepository from "./repositories/tradesRepository";
import { CerberusWSS } from "./wss";

function evalCondition(automation: Automation, pool: Pool) {
    
    const condition = automation.isOpened ? automation.closeCondition : automation.openCondition;
    if (!condition) return false;

    const ifCondition = `pool.${condition.field}${condition.operator}${condition.value}`;
    console.log(`Condition: ` + ifCondition);

    return Function("pool", "return " + ifCondition)(pool);
}

export default async (pool: Pool, WSS: CerberusWSS) : Promise<void> => {

    // buscar automações
    const automations = await automationsRepository.searchAutomations(pool.id);
    if (!automations || !automations.length) return;
    
    console.log(`${automations.length} automations found!`);
    
    automations.map(async (automation) => {
        
        // testar condições
        const isValid = evalCondition(automation, pool);
        if (!isValid) return;

        console.log(`${automation.name} fired!`);

        const user = await usersRepository.getUserById(automation.userId);
        if (!user || !user.privateKey) return;

        console.log(`${user.email} will swap.`);

        try {
            
            const swapResult = await swap(user, automation, pool);

            if (!swapResult) return;
            
            if(swapResult.amountOut)
                automation.nextAmount = swapResult.amountOut;

            let trade;

            if (automation.isOpened) {
                trade = await tradesRepository.closeTrade(automation.userId, automation.id!, swapResult)
                automation.tradeCount = automation.tradeCount ? automation.tradeCount + 1 : 1;
                automation.pnl = automation.pnl ? automation.pnl + trade?.pnl! : trade?.pnl;
            } else {
                trade = await tradesRepository.addTrade({
                    automationId: automation.id!,
                    userId: automation.userId,
                    openAmountIn: swapResult.amountIn,
                    openAmountOut: swapResult.amountOut,
                    openPrice: swapResult.price
                })
            }

            WSS.direct(automation.userId, {type: "success", trade});

            automation.isOpened = !automation.isOpened;

        } catch (err: any) {
                    
            console.error(`Cannot swap. AutomationId: ${automation.id}`);
            console.error(err);

            automation.isActive = false;

            WSS.direct(automation.userId, {type: "error", text: err.message});

            //TODO: reativar envio de email de erro de swap
            
            // await sendMail(
            //     user.email,
            //     "Cerberus - Automation Error",
            //     `
            //     Hi, ${user.name}!

            //     Your automation was stopped due to a swap error.

            //     Automation name: ${automation.name}

            //     Error: ${err.message}

            //     See ya!
            //     Cerberus Admin
            //     `
            // );

        }

        // salvar a automação
        await automationsRepository.updateAutomation(automation);

    })

}