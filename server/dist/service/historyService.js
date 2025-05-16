// TODO: Define a City class with name and id properties
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const historyFilePath = path.resolve(__dirname, '../data/searchHistory.json');
// TODO: Complete the HistoryService class
class HistoryService {
    // Read the search history from the file
    async read() {
        try {
            const data = await fs.readFile(historyFilePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    // Write the updated search history to the file
    async write(cities) {
        await fs.writeFile(historyFilePath, JSON.stringify(cities, null, 2));
    }
    // Get all cities from the search history
    async getCities() {
        return this.read();
    }
    // Add a city to the search history
    async addCity(cityName) {
        const cities = await this.read();
        const newCity = { id: uuidv4(), name: cityName };
        cities.push(newCity);
        await this.write(cities);
    }
    // Remove a city from the search history
    async removeCity(id) {
        const cities = await this.read();
        const updatedCities = cities.filter((city) => city.id !== id);
        await this.write(updatedCities);
    }
}
export default new HistoryService();
