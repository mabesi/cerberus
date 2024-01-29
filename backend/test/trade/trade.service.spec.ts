import { Test, TestingModule } from '@nestjs/testing';
import { newTrade } from './trade.service.mock';
import { prismaMock } from '../db.mock';
import { trades } from 'commons/data';
import { TradeService } from '../../src/trade/trade.service';

describe('TradeService Tests', () => {

    const userId = "user123";
    let tradeService: TradeService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [TradeService],
        }).compile();
        tradeService = moduleFixture.get<TradeService>(TradeService);
    });

    it ('Should be defined', () => {
        expect(tradeService).toBeDefined();
    });

    it('Should get trades', async () => {
        prismaMock.trades.findMany.mockResolvedValue([{...newTrade} as trades]);
        const automations = await tradeService.getClosedTrades(userId, new Date(), new Date());
        expect(automations.length).toEqual(1);
    })
})