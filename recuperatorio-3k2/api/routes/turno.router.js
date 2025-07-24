import express from "express";
import turnoService from "../services/turno.service.js"

const router = express.Router();

// Ruta para obtener todos los turnos
router.get("/todos", async (req, res) => {
    try {
        const turnos = await turnoService.obtenerTodos();
        res.status(200).json(turnos);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | OBTENER TODOS " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para obtener turnos futuros
router.get("/inicial", async (req, res) => {
    try {
        const turnosFuturos = await turnoService.obtenerTurnosFuturos();
        res.status(200).json(turnosFuturos);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | OBTENER TURNOS FUTUROS " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para obtener un turno sin id
router.get("/uno", async (req, res) => {
    try {
        const body = req.query;
        const turno = await turnoService.obtenerUno(body);
        res.status(200).json(turno);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | OBTENER UNO " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para obtener turnos con profesional, especialidad, fecha y hora en la BD
router.get("/existente", async (req, res) => {
    try {
        const body = req.query;
        console.log(body);
        const turno = await turnoService.obtenerExistente(body);
        res.status(200).json(turno);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | OBTENER UNO " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para obtener un turno por id
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const turno = await turnoService.obtenerPorId(id);
        res.status(200).json(turno);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | OBTENER POR ID " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para obtener turnos filtrados futuros
router.get("/", async (req, res) => {
    try {
        const filtros = req.query;
        const turnosFiltrados = await turnoService.obtenerFiltrado(filtros);
        res.status(200).json(turnosFiltrados);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | OBTENER FILTRADO " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para crear turnos
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const turnoCreado = await turnoService.crearTurno(body);
        res.status(201).json(turnoCreado);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | CREAR TURNO " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para duplicar turnos
router.post("/duplicar", async (req, res) => {
    try {
        const body = req.body;
        const turnoDuplicado = await turnoService.duplicarTurno(body);
        res.status(201).json(turnoDuplicado);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | DUPLICAR TURNO " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para modificar turnos
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const body = req.body;
        const turnoEditado = await turnoService.modificarTurno(id, body);
        res.status(200).json(turnoEditado);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | EDITAR TURNO " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para eliminar turnos
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const turnoEliminado = await turnoService.elimiarTurno(id);
        res.status(204).json(turnoEliminado);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en turno.router | EDITAR TURNO " + error.message);
        res.status(status).json({error: error.message});
    }
});

export default router;