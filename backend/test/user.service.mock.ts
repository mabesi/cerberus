import { users } from "commons/data";
import { ChainId } from "commons/models/chainId";
import { Status } from "commons/models/status";

export const newUserMock = {
    address: "0x123456",
    name: "Plinio Mabesi",
    email: "contato@gmail.com",
    id: "abc123",
    activationCode: "123456",
    activationDate: new Date(),
    network: ChainId.MAINNET,
    planId: "Gold",
    privateKey: "abc123",
    status: Status.NEW,
} as users;

export const blockedUserMock = {
    ...newUserMock,
    status: Status.BLOCKED,
} as users;

export const activeUserMock = {
    ...newUserMock,
    status: Status.ACTIVE,
} as users;