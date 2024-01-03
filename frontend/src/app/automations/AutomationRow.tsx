"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Automation from 'commons/models/automation';
import { deleteAutomation, startAutomation, stopAutomation } from '@/services/AutomationService';

type Props = {
    data: Automation;
    onUpdate: Function;
}

function AutomationRow(props: Props) {

    const { push } = useRouter();

    function getPositionClass(automation: Automation) {
        return automation.isOpened ? "text-emerald-500" : "text-red-500";
    }

    function getPositionText(automation: Automation) {
        return automation.isOpened ? "READY TO SELL" : "READY TO BUY";
    }

    function getActiveClass(automation: Automation) {
        return automation.isActive ? "text-emerald-500" : "text-red-500";
    }

    function getActiveText(automation: Automation) {
        return automation.isActive ? "RUNNING" : "NOT RUNNING";
    }

    function btnStartClick() {
        startAutomation(props.data.id!)
            .then(automation => {
                alert(`Automation started successfully!`);
                props.onUpdate();
            })
            .catch(err => alert(err.response ? err.response.data.message.toString() : err.message.toString()))
    }

    function btnStopClick() {
        stopAutomation(props.data.id!)
            .then(automation => {
                alert(`Automation stoped successfully!`);
                props.onUpdate();
            })
            .catch(err => alert(err.response ? err.response.data.message.toString() : err.message.toString()))
    }

    function btnEditClick() {
        push("/automations/new?id=" + props.data.id);
    }

    function btnDeleteClick() {
        if (!confirm(`This operation is irreversible. Are you shure?`)) return;
        deleteAutomation(props.data.id!)
            .then(automation => {
                alert(`Automation deleted successfully!`);
                props.onUpdate();
            })
            .catch(err => alert(err.response ? err.response.data.message.toString() : err.message.toString()))
    }

    return (
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.data.name}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className={`fas fa-circle ${getPositionClass(props.data)} mr-2`}></i> {getPositionText(props.data)}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <i className={`fas fa-circle ${getActiveClass(props.data)} mr-2`}></i> {getActiveText(props.data)}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {
                    props.data.isActive
                    ? (
                        <>
                        <button type="button" onClick={btnStopClick} ><i className="fas fa-stop mr-3"></i></button>
                        <button type="button" onClick={btnEditClick} ><i className="fas fa-pencil mr-3"></i></button>
                        </>
                    )
                    : (
                        <>
                        <button type="button" onClick={btnStartClick} ><i className="fas fa-play mr-3"></i></button>
                        <button type="button" onClick={btnEditClick} ><i className="fas fa-pencil mr-3"></i></button>
                        <button type="button" onClick={btnDeleteClick} ><i className="fas fa-trash mr-3"></i></button>
                        </>
                    )
                }
            </td>
        </tr>
    )
}

export default AutomationRow;