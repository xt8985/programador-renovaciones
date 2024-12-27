
import Ordenador from "./components/ordenador-component";
import Programador from "./components/programador-component";
import CsvToJsonConverter from "./utils/csvToJsonConverter-util";
import { v4 as uuidv4 } from 'uuid';
import JsonUtil from "./utils/json-util";
async function main() {
    const csvFilePath = 'data/polizas.csv';
    const jsonFilePath = `output/${uuidv4()}.json`;
    const jsonOrdenadoFilePath = `output/${uuidv4()}.json`;
    const jsonProgramadoFilePath = `output/${uuidv4()}.json`;
    const convert = new CsvToJsonConverter(csvFilePath);
    await convert.convertToJsonFile(jsonFilePath);

    const ordenador = new Ordenador();
    ordenador.ordenar(jsonFilePath, jsonOrdenadoFilePath);

    const programador = new Programador();
    programador.calcular(jsonOrdenadoFilePath, jsonProgramadoFilePath);

    const report = JsonUtil.read(jsonProgramadoFilePath);
    const total = report.length;
    const trecAuto = report.filter((item: any) => item["TREC: PROCEDE"] === "TREC AUTO").length;
    const trecTradi = total - trecAuto;

    console.log(`Total de pólizas: ${total}`);
    console.log(`Total de pólizas TREC AUTO: ${trecAuto}`);
    console.log(`Total de pólizas TREC TRADI: ${trecTradi}`);
    console.log(`Porcentaje: ${((trecAuto / total) * 100).toFixed(2)}%`);
}
main();