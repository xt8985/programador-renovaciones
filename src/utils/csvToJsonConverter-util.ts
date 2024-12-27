import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import JsonUtil from './json-util';

class CsvToJsonConverter {
    private readonly csvFilePath: string;

    constructor(csvFileName: string) {
        this.csvFilePath = path.resolve(__dirname, '../../', csvFileName);
    }

    public async convertToJson(): Promise<object[]> {
        const records: object[] = [];

        try {
            const parser = fs.createReadStream(this.csvFilePath)
                .pipe(parse({
                    delimiter: ';',
                    columns: true,
                    skip_empty_lines: true,
                    trim: true
                }));

            for await (const record of parser) {
                records.push(record);
            }

            return records;
        } catch (error) {
            throw new Error('Error al procesar el archivo CSV: ' + (error as Error).message);
        }
    }

    public async convertToJsonFile(outputFileName: string): Promise<void> {
        const records = await this.convertToJson();
        JsonUtil.create(outputFileName, records);
        console.log(`Archivo JSON generado: ${outputFileName}`);
    }
}

export default CsvToJsonConverter;
