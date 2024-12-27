import { TREC_LIMITE_FACILITY, TREC_LIMITE_SINIESTRALIDAD, TREC_PLANES_AUTOMATICO } from "../config/trec-config";
import DateUtil from "../utils/date-util";

class TrecValidator {
    constructor() {
        console.log('TrecValidator creado');
    }

    static validarPlan(plan: number): boolean {
        const planes = TREC_PLANES_AUTOMATICO.filter((item) => item.CONCATENADO === plan);
        return planes.length === 1;
    }

    static validarSiniestralidad(siniestralidad: number): boolean {
        return siniestralidad <= TREC_LIMITE_SINIESTRALIDAD;
    }

    static validarVigencia(fechaInicio: string, fechaFin: string): boolean {
        const inicio = DateUtil.parseFecha(fechaInicio);
        const fin = DateUtil.parseFecha(fechaFin);
        const diferenciaDias = DateUtil.diferenciaDias(inicio, fin);
        return !(diferenciaDias > 370 || diferenciaDias < 360)
    }

    static validarFacility(sumaAsegurada: number): boolean {
        return (sumaAsegurada / 3) <= TREC_LIMITE_FACILITY;
    }
}

export default TrecValidator;