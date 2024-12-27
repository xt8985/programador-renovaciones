import path from "path";
import fs from 'fs';

class JsonUtil {
    static read(jsonFilePath: string): object[] {
        try {
            const jsonData = fs.readFileSync(path.resolve(__dirname, '../../', jsonFilePath), 'utf-8');
            return JSON.parse(jsonData);
        } catch (error) {
            throw new Error(`Error al leer el archivo JSON: ${error instanceof Error ? error.message : 'Desconocido'}`);
        }
    }

    static create(jsonFilePath: string, data: object[]): void {
        fs.writeFileSync(path.resolve(__dirname, '../../', jsonFilePath), JSON.stringify(data, null, 2));
        console.log(`Archivo JSON generado: ${jsonFilePath}`);
    }
}

export default JsonUtil;