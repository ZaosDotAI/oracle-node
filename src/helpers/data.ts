import path from "path";
import fs from 'fs'

// Function to get the previous cursor and timestamp values
export const getCursorAndTimestamp = () => {
    const filePath = path.join(__dirname, '../../src/mock/db.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

// Function to set the previous cursor and timestamp value
export const setCursorAndTimestamp = async (data: Record<string, any>) => {
    try {
        const filePath = path.join(__dirname, '../../src/mock/db.json');
        console.log("Setting cursor and timestamp", data);
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw error;
    }
};