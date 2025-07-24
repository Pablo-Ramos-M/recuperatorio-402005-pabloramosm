import RepositorioBase from "./repositorioBase.js";
// Import de los modelos
import Turno from "../models/turno.js";
import Centro from "../models/centro.js";
// Import de Op de sequelize
import { Op } from "sequelize";

class TurnoRepository extends RepositorioBase {
    constructor() {
        super(Turno);
    }

    async obtenerTodos () {
        try {
            const response = await Turno.findAll({
                include: {
                    model: Centro,
                    as: "centro"
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | OBTENER TODOS " + error.message);
        }
    }

    async obtenerUno (body) {
        try {
            const response = await Turno.findOne({
                where: {
                    profesional: body.profesional,
                    especialidad: body.especialidad,
                    fecha: body.fecha,
                    hora: body.hora,
                    consultorio: body.consultorio,
                    estado: body.estado,
                    idCentro: body.idCentro
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | OBTENER TODOS " + error.message);
        }
    }

    async obtenerTurnosFuturos () {
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        try {
            const response = await Turno.findAll({
                where: {
                    fecha: {[Op.gte]: fechaActual}
                },
                include: {
                    model: Centro,
                    as: "centro"
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | OBTENER TODOS " + error.message);
        }
    }

    async obtenerPorId (id) {
        try {
            const response = await Turno.findByPk(id, {
                include: {
                    model: Centro,
                    as: "centro"
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | OBTENER POR ID " + error.message);
        }
    }

    async obtenerFiltrado ({prof, espe, fechaTurno, est, centro} = {}) {
        try {
            const condiciones = [];
            if (prof) {
                condiciones.push({
                    profesional: {[Op.like]: `%${prof}%`}
                });
            }

            if (espe) {
                condiciones.push({
                    especialidad: {[Op.like]: `%${espe}%`}
                });
            }

            if (fechaTurno) {
                condiciones.push({
                    fecha: {[Op.eq]: fechaTurno}
                });
            }

            if (est) {
                condiciones.push({
                    estado: {[Op.eq]: est}
                });
            }

            if (centro) {
                condiciones.push({
                    idCentro: {[Op.eq]: centro}
                });
            }

            const response = await Turno.findAll({
                where: {[Op.and]: condiciones},
                include: {
                    model: Centro,
                    as: "centro"
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | OBTENER FILTRADO " + error.message);
        }
    }

    async existeUnoDistinto (prof, cons, fechaTurno, horaTurno, id) {
        try {
            const response = await Turno.findOne({
                where: {
                    profesional: prof,
                    consultorio: cons,
                    fecha: fechaTurno,
                    hora: horaTurno,
                    idTurno: {[Op.ne]: id}
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | EXISTE DUPLICADO " + error.message);
        }
    }

    async existeDuplicado (prof, cons, fechaTurno, horaTurno) {
        try {
            const response = await Turno.findOne({
                where: {
                    profesional: prof,
                    consultorio: cons,
                    fecha: fechaTurno,
                    hora: horaTurno
                }
            });
            return response;
        } catch (error) {
            throw new Error("Error en turno.repository | EXISTE DUPLICADO " + error.message);
        }
    }
}

export default new TurnoRepository;