// Para poder usarlo en otros archivos
export class HeroeModel {

    id: string;
    nombre: string;
    poder: string;
    vivo: boolean;

    constructor() {
        // Cuando creemos una nueva instancia de HeroeModel por defecto vivo = true
        this.vivo = true;
    }
}