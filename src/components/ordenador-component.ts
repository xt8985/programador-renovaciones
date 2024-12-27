import { Poliza } from "../interfaces/poliza-interface";
import { ordenadorMapper } from "../mappers/ordenador-mapper";
import JsonUtil from "../utils/json-util";

class Ordenador {
    // private readonly productosPermitidos: number[] = [1002, 1101, 1201, 1301, 1501, 1505, 1601, 1996, 3301, 3331, 3341, 3351, 1204, 3001, 3002, 3003, 9999, 9899];
    private readonly productosPermitidos: number[] = [3301];

    private mapperObject(obj: Poliza): PolizaOrdenada {
        const sortedObj: { [key: string]: string } = {};
        const mapper: { [key: string]: string } = ordenadorMapper;

        for (const finalKey in mapper) {
            const originalKey = mapper[finalKey];
            if (obj.hasOwnProperty(originalKey)) {
                sortedObj[finalKey] = obj[originalKey];
            } else {
                sortedObj[finalKey] = originalKey;
            }
        }

        return sortedObj as PolizaOrdenada;
    }

    ordenar(jsonFilePath: string, outputFilePath: string): void {
        console.log('Ordenando...');
        const jsonData = JsonUtil.read(jsonFilePath) as Poliza[];
        const ordenado = jsonData
            .filter((item: Poliza) => this.productosPermitidos.includes(parseInt(item.id_producto)))
            .map((item) => this.mapperObject(item));

        JsonUtil.create(outputFilePath, ordenado);
    }
}

export default Ordenador;