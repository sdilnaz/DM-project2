import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../data/problems.json');

export const readProblemsFromFile = (): any[] => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

export const writeProblemsToFile = (problems: any[]): void => {
    fs.writeFileSync(filePath, JSON.stringify(problems, null, 2));
};
