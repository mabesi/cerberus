"use client";

import React from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import FooterAdmin from "@/components/Footers/FooterAdmin";

export default function Automations() {

  const color: string = "dark";

  return (
    <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar pageName="Automations" />
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12"></div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                <div className="flex flex-wrap my-4">
                    <div className="w-full mb-12 px-4">
                    <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <button
                    className="bg-lightBlue-600 active:bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 absolute right-0"
                    type="button"
                    // onClick={btnSaveClick}
                >
                {
                    // isLoading
                    // ? "Saving..."
                    // : "Save Settings"
                } New Automation
                </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-8">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Automation
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Position
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    WETH Hodler Bot
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> READY TO BUY
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> RUNNING
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button type="button"><i className="fas fa-play mr-3"></i></button>
                  <button type="button"><i className="fas fa-stop mr-3"></i></button>
                  <button type="button"><i className="fas fa-pencil mr-3"></i></button>
                  <button type="button"><i className="fas fa-trash mr-3"></i></button>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    WETH Hodler Bot
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> READY TO BUY
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> RUNNING
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button type="button"><i className="fas fa-play mr-3"></i></button>
                  <button type="button"><i className="fas fa-stop mr-3"></i></button>
                  <button type="button"><i className="fas fa-pencil mr-3"></i></button>
                  <button type="button"><i className="fas fa-trash mr-3"></i></button>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    WETH Hodler Bot
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> READY TO BUY
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> RUNNING
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button type="button"><i className="fas fa-play mr-3"></i></button>
                  <button type="button"><i className="fas fa-stop mr-3"></i></button>
                  <button type="button"><i className="fas fa-pencil mr-3"></i></button>
                  <button type="button"><i className="fas fa-trash mr-3"></i></button>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    WETH Hodler Bot
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> READY TO BUY
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-green-500 mr-2"></i> RUNNING
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button type="button"><i className="fas fa-play mr-3"></i></button>
                  <button type="button"><i className="fas fa-stop mr-3"></i></button>
                  <button type="button"><i className="fas fa-pencil mr-3"></i></button>
                  <button type="button"><i className="fas fa-trash mr-3"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
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