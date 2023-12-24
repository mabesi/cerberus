import axios from "axios";
import ConfigService from "./ConfigService";
import { User } from "commons/models/user";
import { JWT } from "commons/models/jwt";

const AUTH_URL = `${ConfigService.BACKEND_URL}/auth`;

export type Auth = {
    wallet: string;
    secret: string;
    timestamp: number;
}

export async function signIn(data: Auth) : Promise<string> {

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

export function parseJwt(token: string) : JWT {

    if (!token) throw new Error("Token is required.");

    const base64Str = token.split(".")[1];
    const base64 = base64Str.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

export function getJwt(): JWT | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return parseJwt(token);
}