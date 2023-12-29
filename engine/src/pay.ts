import CFG from "./config";
import { getCustomerNextPayment, getCustomers, pay } from "commons/services/cerberusPayService";
import usersRepository from "./repositories/usersRepository";
import { Status } from "commons/models/status";
import sendMail from "./services/mailService";

async function executionCycle() {
    
    console.log(`Executing the payment cycle`);

    const customers = await getCustomers();
    console.log(customers.length + ` customers loaded`);

    for (let i=0; i < customers.length; i++) {

        const customerAddress = customers[i].toLowerCase();
        if (/0x0+/.test(customerAddress)) continue;

        const nextPayment = await getCustomerNextPayment(customerAddress);
        if (nextPayment > (Date.now() / 1000)) continue;

        try {
            console.log(`Charging customer ` + customerAddress);
            await pay(customerAddress);
        } catch (err) {
            
            console.log(`Blocking customer ` + customerAddress);
            const user = await usersRepository.updateUserStatus(customerAddress, Status.BLOCKED);
            if (!user) continue;

            await sendMail(
                user.email,
                "Cerberus - Account Blocked",
                `
                Hi, ${user.name}!

                Your account was blocked due to insufficient balance or allowance.
                Please, click in the link below (or copy-paste in the browser) to update your payment info:

                ${CFG.SITE_URL}/pay/${user.address}

                See ya!
                Cerberus Admin
                `
            );

            //TODO: bloquear as automações do usuário bloqueado
        }
    }
}

export default () => {
    setInterval(executionCycle, CFG.CHARGE_INTERVAL);
    console.log(`Cerberus Pay started`);
    executionCycle();    
}