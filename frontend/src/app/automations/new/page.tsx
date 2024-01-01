"use client";

import React, { useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import FooterAdmin from "@/components/Footers/FooterAdmin";
import Alert, { AlertProps } from "@/components/Alert";
import Automation from "commons/models/automation";
import { ChainId } from "commons/models/chainId";
import { Exchange } from "commons/models/exchange";

export default function Settings() {

    const { push } = useRouter();
    const queryString = useSearchParams();
    const automationId = queryString.get("id");

    const DEFAULT_AUTOMATION = {
        isOpened: false,
        isActive: false,
        network: ChainId.MAINNET,
        exchange: Exchange.Uniswap
    } as Automation;

    const [automation, setAutomation] = useState<Automation>(DEFAULT_AUTOMATION);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [alert, setAlert] = useState<AlertProps>({show: false, type: "", message: ""});
    const onCloseAlert = () => {
        setAlert({show: false, type: "", message: ""});
    }

    useEffect(() => {
        
        if (!automationId) return;

        //TODO: carregar a automação

    },[automationId]);

    function onAutomationChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setAutomation((prevState: any) => ({...prevState, [evt.target.id]: evt.target.value}));
    }

    function btnSaveClick() {

        if (!confirm("This action will consume some wei ('approve' function). Are you sure?")) return;
        
        onCloseAlert();
        setIsLoading(true);
        
        //TODO: salvar a automação
    }

  return (
    <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar pageName="Automations" />
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12"></div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">{automationId ? "Edit " : "New "}Automation</h6>
                            <button
                                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={btnSaveClick}
                            >
                            {
                                isLoading
                                ? "Saving..."
                                : "Save Automation"
                            }
                            </button>
                        </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                        <Alert show={alert.show} type={alert.type} message={alert.message} onCloseAlert={onCloseAlert} />

                        <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            General
                            </h6>

                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={automation.name || ""}
                                        onChange={onAutomationChange}
                                    />
                                    </div>
                                </div>
                                
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    era email...
                                    </div>
                                </div>
                            
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Pool
                            </h6>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Strategy
                            </h6>

                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="nextAmount"
                                    >
                                        Trade Amount
                                    </label>
                                    <input
                                        type="text"
                                        id="nextAmount"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={automation.nextAmount || "0"}
                                        onChange={onAutomationChange}
                                    />
                                    </div>
                                </div>
                                
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    era email...
                                    </div>
                                </div>
                            
                            </div>


                        </form>
                        </div>
                    </div>
                    </div>
                </div>

                <FooterAdmin />
            </div>
        </div>
    </>
  );
}