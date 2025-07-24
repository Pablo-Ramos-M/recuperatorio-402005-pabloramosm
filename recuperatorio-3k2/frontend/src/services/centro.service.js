import axios from "./axios.config.js";

const obtenerTodos = async () => {
    try {
        const response = await axios.get("/centros");
        return response.data;
    } catch (error) {
        throw new Error("Error en centro.service Frontend | OBTENER TODOS " + error.message);
    }
}

const obtenerPorId = async (id) => {
    try {
        const response = await axios.get(`/centros/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en centro.service Frontend | OBTENER POR ID " + error.message);
    }
}

export default {
    obtenerTodos,
    obtenerPorId
}