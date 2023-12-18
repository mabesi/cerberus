"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbars/AuthNavbar.js";
import FooterSmall from "@/components/Footers/FooterSmall.js";
import { User } from "commons/models/user";
import { Plan } from "commons/models/plan";
import { Status } from "commons/models/status";
import { ChainId } from "commons/models/chainId";

export default function Pay() {

  const { push } = useRouter();

  const params = useParams();

  const wallet : string = typeof params.wallet === "string" ? params.wallet : params.wallet[0];

  const [user, setUser] = useState<User>({} as User);
  const [plan, setPlan] = useState<Plan>({
      name: "Gold",
      id: "Gold",
      tokenSymbol: "WETH",
      tokenAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      price: "0.001",
      maxAutomations: 10
  });
  const [message, setMessage ] = useState<string>("");

  useEffect(() => {
    
    // carregar user do banco a partir da wallet
    
    setUser({
      name: "Mabesi",
      email: "email@gmail.com",
      status: Status.BLOCKED,
      network: ChainId.GOERLI,
      address: wallet,
      planId: "Gold",
      privateKey: "0x0001",
      activationCode: "123456",
      activationDate: new Date()
    });

    //carregar dados do plano

    setPlan({
      name: "Gold",
      id: "Gold",
      tokenSymbol: "WETH",
      tokenAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      price: "0.001",
      maxAutomations: 10
    });

  }, [wallet]);

  function btnPayClick() {
    push("/dashboard");
  }

  return <>
    <Navbar transparent />
    <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            backgroundImage: "url('/img/bg_04.png')",
          }}
        ></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="flex content-center items-center justify-center mb-5">
                    <img src="/img/cerberus.png" width={128} />
                  </div>
                  <div className="text-center mb-3">

                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Below is your plan details.
                    </h6>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        User
                      </label>
                      <div>
                          {user.name}<br />{user.address}
                      </div>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Plan
                      </label>
                      <select id="planId" value={plan.id} onChange={evt => setPlan({ ...plan, id: evt.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={plan.id}>Gold</option>
                      </select>

                      <div className="mt-3">
                        Your last payment was: <strong>Never</strong>
                      </div>

                      <div className="mt-3">
                        This plan costs <strong>{plan.price} {plan.tokenSymbol}/mo.</strong> and gives you full access to our platform and <strong>{plan.maxAutomations}</strong> automations.
                      </div>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-5 inline-flex items-center"
                        type="button"
                        onClick={btnPayClick}
                      >
                        <span>Pay Now</span>
                      </button>
                      <div>{message}</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      <FooterSmall absolute />
      </section>
    </main>
  </>;
}
