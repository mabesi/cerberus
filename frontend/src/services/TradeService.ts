import axios from "./BaseService";
import ConfigService from "./ConfigService";
import Trade from "commons/models/trade";

const TRADES_URL = `${ConfigService.BACKEND_URL}/trades`;

export async function getClosedTrades(dateFrom: Date, dateTo: Date = new Date()): Promise<Trade[]> {
    const response = await axios.get(`${TRADES_URL}/closed?dateFrom=${dateFrom}&pageSize=${dateTo}`);
    return response.data as Trade[];
}
