import centroRepository from "../repositories/centro.repository.js";

class CentroService {
    static async obtenerTodos () {
        try {
            const response = await centroRepository.obtenerTodos();
            return response;
        } catch (error) {
            return error;
        }
    }

    static async obtenerPorId (id) {
        try {
            const response = await centroRepository.obtenerPorId(id);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default CentroService;