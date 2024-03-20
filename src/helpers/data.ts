import path from "path";
import fs from 'fs'

// Function to get the previous cursor value
export const getCursor = () => {
    const filePath = path.join(__dirname, '../../src/mock/db.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

// Function to save the previous cursor value
export const saveCursor = async (data: Record<string, any>) => {
    try {
        const filePath = path.join(__dirname, '../../src/mock/db.json');
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw error;
    }
};