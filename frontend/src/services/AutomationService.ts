import axios from "./BaseService";
import ConfigService from "./ConfigService";
import Automation from "commons/models/automation";

const AUTOMATIONS_URL = `${ConfigService.BACKEND_URL}/automations`;

export async function getAutomation(id: string): Promise<Automation> {
    const response = await axios.get(`${AUTOMATIONS_URL}/${id}`);
    return response.data as Automation;
}

export async function getAutomations(page: number = 1, pageSize: number = 20): Promise<Automation[]> {
    const response = await axios.get(`${AUTOMATIONS_URL}/?page=${page}&pageSize=${pageSize}`);
    return response.data as Automation[];
}

export async function getActiveAutomations(): Promise<Automation[]> {
    const response = await axios.get(`${AUTOMATIONS_URL}/active`);
    return response.data as Automation[];
}

export async function getTopAutomations(): Promise<Automation[]> {
    const response = await axios.get(`${AUTOMATIONS_URL}/top`);
    return response.data as Automation[];
}

export async function addAutomation(automation: Automation): Promise<Automation> {
    const response = await axios.post(`${AUTOMATIONS_URL}/`, automation);
    return response.data as Automation;
}

export async function startAutomation(id: string): Promise<Automation> {
    const response = await axios.post(`${AUTOMATIONS_URL}/${id}/start`);
    return response.data as Automation;
}

export async function stopAutomation(id: string): Promise<Automation> {
    const response = await axios.post(`${AUTOMATIONS_URL}/${id}/stop`);
    return response.data as Automation;
}

export async function updateAutomation(id: string, automation: Automation): Promise<Automation> {
    const response = await axios.patch(`${AUTOMATIONS_URL}/${id}`, automation);
    return response.data as Automation;
}

export async function deleteAutomation(id: string): Promise<Automation> {
    const response = await axios.delete(`${AUTOMATIONS_URL}/${id}`);
    return response.data as Automation;
}