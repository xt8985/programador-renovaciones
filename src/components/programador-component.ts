import JsonUtil from "../utils/json-util";
import TrecValidator from "../validators/trec-validator";

class Programador {
    private calculateObject(obj: PolizaOrdenada): object {
        const plan = TrecValidator.validarPlan(Number(obj.ID_PLAN));
        const vigencia = TrecValidator.validarVigencia(obj.INICIO_VIGENCIA, obj.FIN_VIGENCIA);
        const vd = TrecValidator.validarFacility(Number(obj.SUMASEG));
        let siniestralidad: number;
        if (obj.SINIESTRO_100 === "0") {
            siniestralidad = 0;
        } else if (obj.PRIMA_DEVENGADA === "0") {
            siniestralidad = 1;
        } else {
            siniestralidad = Number(obj.SINIESTRO_100) / Number(obj.PRIMA_DEVENGADA);
        }
        const siniestro = TrecValidator.validarSiniestralidad(siniestralidad);
        const tipoRenovacionAutomatica = [+plan, +siniestro, +vigencia].reduce((acc, item) => acc + item, 0) === 3;
        const tipoRenovacionSemiAutomatica = [+plan, +siniestro, +vigencia, +vd].reduce((acc, item) => acc + item, 0) === 3;
        let tipoRenovacion: string;
        let tipoEmision: string;
        if (tipoRenovacionAutomatica) {
            tipoRenovacion = "TREC AUTO";
            tipoEmision = "DIGITAL";
        } else if (tipoRenovacionSemiAutomatica) {
            tipoRenovacion = "TREC TRADI";
            tipoEmision = "MANUAL";
        } else {
            tipoRenovacion = "TREC TRADI";
            tipoEmision = "MANUAL";
        }
        return {
            ...obj,
            "TREC: PLAN": +plan,
            "TREC: SINIESTRALIDAD": +siniestro,
            "TREC: VIGENCIA": +vigencia,
            "TREC: VD": +vd,
            "TREC: PROCEDE": tipoRenovacion,
            "TREC: EMISION": tipoEmision
        }
    }

    calcular(jsonFilePath: string, outputFilePath: string): void {
        console.log('Calculando...');
        const jsonData = JsonUtil.read(jsonFilePath) as PolizaOrdenada[];
        const programado = jsonData
            .map((item) => this.calculateObject(item));

        JsonUtil.create(outputFilePath, programado);
        console.log('Proceso finalizado: ' + outputFilePath);
    }
}

export default Programador;