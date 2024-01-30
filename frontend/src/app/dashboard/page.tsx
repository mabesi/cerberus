"use client";

import React from "react";

// components
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderStats from "@/components/Headers/HeaderStats";
import FooterAdmin from "@/components/Footers/FooterAdmin.js";
import CardLineChart from "@/components/Cards/CardLineChart.js";
import CardTopPools from "@/components/Cards/CardTopPools";
import CardTopAutomations from "@/components/Cards/CardTopAutomations";

export default function Dashboard() {
  return (
    <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar pageName="Dashboard" />
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                <div className="flex flex-wrap">
                    <div className="w-full mb-12 xl:mb-0 px-4">
                    <CardLineChart />
                    </div>
                </div>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardTopPools />
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                    <CardTopAutomations />
                    </div>
                </div>
                <FooterAdmin />
            </div>
        </div>
    </>
  );
}
