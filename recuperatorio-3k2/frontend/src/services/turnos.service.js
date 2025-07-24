import axios from "./axios.config.js";

const obtenerTurnosFuturos = async () => {
    try {
        const response = await axios.get('/turnos/inicial');
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | OBTENER TURNOS FUTUROS " + error.message);
    }
}

const obtenerFiltrado = async (filtros) => {
    try {
        const params = new URLSearchParams(filtros).toString();
        const response = await axios.get(`/turnos?${params}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | OBTENER FILTRADO " + error.message);
    }
}

const elimiarTurno = async (id) => {
    try {
        const response = await axios.delete(`/turnos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | ELIMINAR TURNO " + error.message);
    }
}

const obtenerPorId = async (id) => {
    try {
        const response = await axios.get(`/turnos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | OBTENER TURNO POR ID " + error.message);
    }
}

const obtenerUno = async (body) => {
    try {
        const params = new URLSearchParams(body).toString();
        const response = await axios.get(`/turnos/uno?${params}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | OBTENER UNO " + error.message);
    }
}

const obtenerExistente = async (body) => {
    try {
        const params = new URLSearchParams(body).toString();
        const response = await axios.get(`/turnos/existente?${params}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | OBTENER EXISTENTE " + error.message);
    }
}

const obtenerIgualDatos = async (body) => {
    try {
        const params = new URLSearchParams(body).toString();
        const response = await axios.get(`/turnos/igualDatos?${params}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | OBTENER EXISTENTE " + error.message);
    }
}

const duplicarTurno = async (body) => {
    try {
        const response = await axios.post('/turnos/duplicar', body);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | DUPLICAR TURNO " + error.message);
    }
}

const crearTurno = async (body) => {
    try {
        console.log(body);
        const response = await axios.post('/turnos', body);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | CREAR TURNO " + error.message);
    }
}

const editarTurno = async (id, body) => {
    try {
        const response = await axios.put(`/turnos/${id}`, body);
        return response.data;
    } catch (error) {
        throw new Error("Error en turnos.service Frontend | EDITAR TURNO " + error.message);
    }
}

export default {
    obtenerTurnosFuturos,
    obtenerFiltrado,
    elimiarTurno,
    obtenerPorId,
    obtenerUno,
    duplicarTurno,
    editarTurno,
    crearTurno,
    obtenerExistente,
    obtenerIgualDatos
}