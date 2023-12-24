import axios from "axios";
import ConfigService from "./ConfigService";
import { User } from "commons/models/user";

const AUTH_URL = `${ConfigService.BACKEND_URL}/auth`;

export type Auth = {
    wallet: string;
    secret: string;
    timestamp: number;
}

export async function signIn(data: Auth) {

    const response = await axios.post(`${AUTH_URL}/signin`, data);
    return response.data;
}

export async function signUp(data: User) {

    const response = await axios.post(`${AUTH_URL}/signup`, data);
    return response.data;
}

export async function activate(wallet: string, code: string) : Promise<string> {

    if (!wallet || !code) return ""

    const response = await axios.post(`${AUTH_URL}/activate/${wallet}/${code}`);
    return response.data;
}