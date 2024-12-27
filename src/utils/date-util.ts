class DateUtil {
    static parseFecha(fecha: string): Date {
        const [dia, mes, año] = fecha.split('/').map(Number);
        return new Date(año, mes - 1, dia);
    }

    static diferenciaDias(fechaInicio: Date, fechaFin: Date): number {
        const diferencia = fechaFin.getTime() - fechaInicio.getTime();
        return Math.floor(diferencia / (1000 * 60 * 60 * 24));
    }
}

export default DateUtil;