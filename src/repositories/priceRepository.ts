import fs from 'fs';
import path from 'path';
import { Price } from '../models/priceModel';

// Define la ruta del archivo de manera que apunte a src/data
const filePath = path.resolve(__dirname, '../data/prices.json');

export class PriceRepository {
    static async savePrices(prices: Price[]): Promise<void> {
        // Asegúrate de que el directorio exista
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Reemplaza el contenido del archivo con los nuevos datos
        try {
            fs.writeFileSync(filePath, JSON.stringify(prices, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing to prices file:', error);
        }
    }

    static getAllPrices(): Price[] {
        let prices: Price[] = [];
        try {
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8');
                prices = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error reading prices file:', error);
        }
        return prices;
    }
}
