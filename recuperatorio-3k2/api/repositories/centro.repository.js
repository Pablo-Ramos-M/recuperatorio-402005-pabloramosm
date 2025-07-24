import RepositorioBase from "./repositorioBase.js";
import Centro from "../models/centro.js";

class CentroRepository extends RepositorioBase {
    constructor() {
        super(Centro)
    }

    async obtenerTodos () {
        try {
            const response = await Centro.findAll();
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new CentroRepository;