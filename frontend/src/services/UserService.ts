import { User } from "commons/models/user";
import axios from "./BaseService";
import ConfigService from "./ConfigService";

const USERS_URL = `${ConfigService.BACKEND_URL}/users`;

export async function getUser(identifier: string) : Promise<User> {

    const response = await axios.get(`${USERS_URL}/${identifier}`);
    return response.data;
}

export async function updateUser(id: string, user: User) : Promise<User> {

    const response = await axios.patch(`${USERS_URL}/${id}`, user);
    return response.data;
}

export async function payUser() : Promise<User> {

    const response = await axios.post(`${USERS_URL}/pay`);
    return response.data;
}