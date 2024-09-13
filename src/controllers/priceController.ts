import { Request, Response } from 'express';
import { PriceService } from '../services/priceService';

export class PriceController {
    static async fetchPrices(req: Request, res: Response): Promise<void> {
        const allPrices = await PriceService.fetchAndSavePrices();
        res.json(allPrices);
    }

    static getPriceComparison(req: Request, res: Response): void {
        const comparison = PriceService.getPriceComparison();
        res.json(comparison);
    }

    static getPrices(req: Request, res: Response): void {
        try {
            const prices = PriceService.getPrices();
            res.status(200).json(prices);
        } catch (error) {
            res.status(500).json({ error: 'Error al leer el archivo de precios' });
        }
    }
}
