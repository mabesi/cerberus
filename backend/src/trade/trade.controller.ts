import { Controller, Get, Headers, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { TradeService } from './trade.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller("trades")
export class TradeController {

    constructor(
        private readonly tradeService: TradeService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(AuthGuard)
    @Get("closed")
    async getClosedTrades(
        @Headers("Authorization") authorization: string,
        @Query("dateFrom", ParseIntPipe) dateFrom: number,
        @Query("dateTo", ParseIntPipe) dateTo: number
        ) {
        
        if (!dateFrom) dateFrom = Date.now() - (30 * 24 * 60 * 60 * 1000);
        if (!dateTo) dateTo = Date.now();

        const jwt = this.authService.decodeToken(authorization);

        return this.tradeService.getClosedTrades(jwt.userId, new Date(dateFrom), new Date(dateTo));
    }
}