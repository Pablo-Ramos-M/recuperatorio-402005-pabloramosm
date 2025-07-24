import express from "express";
import centroService from "../services/centro.service.js";

const router = express.Router();

// Ruta para obtener todos los centros
router.get("/", async (req, res) => {
    try {
        const centros = await centroService.obtenerTodos();
        res.status(200).json(centros);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en centro.router | OBTENER TODOS " + error.message);
        res.status(status).json({error: error.message});
    }
});

// Ruta para obtener un centro por id
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const centro = await centroService.obtenerPorId(id);
        res.status(200).json(centro);
    } catch (error) {
        const status = error.status || 400;
        console.error("Error en centro.router | OBTENER POR ID " + error.message);
        res.status(status).json({error: error.message});
    }
});

export default router;