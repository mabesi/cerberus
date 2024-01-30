"use client";

import React, { useEffect, useState } from "react";

// components

import CardStats from "@/components/Cards/CardStats.js";
import { getActiveAutomations } from "@/services/AutomationService";

export default function HeaderStats() {

  const [activeAutomations, setActiveAutomations] = useState<number>(0);
  const [openedAutomations, setOpenedAutomations] = useState<number>(0);

  useEffect(() => {
    getActiveAutomations()
      .then(automations => {
        setActiveAutomations(automations.length);
        setOpenedAutomations(automations.filter(a => a.isOpened).length);
      })
      .catch(err => console.error(err.response ? err.response.data.message.toString() : err.message.toString()))
  },[]);

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-700 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Active Automations"
                  statTitle={`${activeAutomations}`}
                  statDescripiron={`${openedAutomations} positions opened`}
                  statIconName="fa fa-robot"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Trading Day"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-clock"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Trading Week"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-calendar"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Trading Month"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}