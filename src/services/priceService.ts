import { PriceRepository } from '../repositories/priceRepository';
import { getHtmlContent } from '../utils/playwrightClient';
import { Price } from '../models/priceModel';
import * as fs from 'fs';
import * as path from 'path';

export class PriceService {
    private static async extractPriceWalmart(html: string): Promise<number> {
        // Utiliza un método de extracción específico para Walmart
        // Completa con el selector adecuado
        return 0;
    }

    // Más métodos de extracción para las demás tiendas...

    static async fetchAndSavePrices(): Promise<Price[]> {
        const urls = [
            { url: 'https://super.walmart.com.mx/ip/jitomate-saladet-por-kilo/00000000004087', store: 'Walmart' },
            { url: 'https://www.soriana.com/jitomate-huaje-saladette-kg/480.html', store: 'Soriana' },
            { url: 'https://www.chedraui.com.mx/tomate-saladet-por-kg-3102861/p', store: 'Chedraui' },
            { url: 'https://despensa.bodegaaurrera.com.mx/ip/jitomate-saladet-por-kilo/00000000004087', store: 'Bodega Aurrera' },
            { url: 'https://www.lacomer.com.mx/lacomer/#!/detarticulo/31516/0/18/1///18?succId=287&succFmt=100', store: 'La Comer' }
        ];

        // Crea un array para almacenar todos los precios
        const allPrices: Price[] = [];

        for (const { url, store } of urls) {
            const html = await getHtmlContent(url);
            let price = 0;
            switch (store) {
                case 'Walmart':
                    price = await this.extractPriceWalmart(html);
                    break;
                // Maneja los demás casos
            }
            const product: Price = {
                name: 'Jitomate Saladet',
                description: 'Por kilo',
                price,
                store,
                lastChecked: new Date().toISOString()
            };
            allPrices.push(product);
        }

        // Guarda todos los precios reemplazando los datos anteriores
        await PriceRepository.savePrices(allPrices);
        return allPrices;
    }

    static getPriceComparison(): any {
        const prices = PriceRepository.getAllPrices();
        if (prices.length === 0) return {};

        const minPrice = Math.min(...prices.map(p => p.price));
        const avgPrice = prices.reduce((acc, p) => acc + p.price, 0) / prices.length;
        const minPriceStore = prices.find(p => p.price === minPrice)?.store || '';

        return {
            lowestPrice: minPrice,
            averagePrice: avgPrice,
            storeWithLowestPrice: minPriceStore
        };
    }

    static getPrices(): any[] {
        const filePath = path.join(__dirname, '../data/prices.json');
        
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } else {
            return [];
        }
    }
}
