import turnoRepository from "../repositories/turno.repository.js";

class TurnoService {
    static async obtenerTodos () {
        try {
            const response = await turnoRepository.obtenerTodos();
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER TODOS " + error.message);
        }
    }

    static async obtenerPorId (id) {
        try {
            const response = await turnoRepository.obtenerPorId(id);
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER POR ID " + error.message);
        }
    }

    static async obtenerFiltrado (filtros) {
        try {
            if (filtros.fecha) {
                const validacionFecha = await this.#validarFecha(filtros.fechaTurno);
                if (validacionFecha) {
                    const response = await turnoRepository.obtenerFiltrado(filtros);
                    return response;
                } else {
                    const fechaActual = new Date();
                    fechaActual.setHours(0, 0, 0, 0);
                    return "Tiene que ingresar una fecha mayor a la fecha actual. FECHA ACTUAL: " + fechaActual;
                }
            } else {
                const response = await turnoRepository.obtenerFiltrado(filtros);
                return response;
            }
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER FILTRADO " + error.message);
        }
    }

    static async crearTurno (body) {
        try {
            const validacionFecha = await this.#validarFecha(body.fecha);
            const existeDuplicado = await this.#existeDuplicado(body.profesional, body.consultorio, body.fecha, body.hora);
            const validarEstado = await this.#validarPertenenciaEstado(body.estado);
            body.estado = validarEstado;
            if (validacionFecha && existeDuplicado) {
                const response = await turnoRepository.crear(body);
                return response;
            } else {
                const fechaActual = new Date();
                fechaActual.setHours(0, 0, 0, 0);
                return "No se puede crear un nuevo turno con una fecha menor a la fecha actual. FECHA ACTUAL: " + fechaActual + `. O existe un registro duplicado`;
            }
        } catch (error) {
            throw new Error("Error en turno.service | CREAR " + error.message);
        }
    }

    static async duplicarTurno (body) {
        try {
            const validacionFecha = await this.#validarFecha(body.fecha);
            const validacionEstado = await this.#validarPertenenciaEstado(body.estado);
            body.estado = validacionEstado;
            if (validacionFecha) {
                const response = await turnoRepository.crear(body);
                return response;
            } else {
                const fechaActual = new Date();
                fechaActual.setHours(0, 0, 0, 0);
                return "No se puede crear un nuevo turno con una fecha menor a la fecha actual. FECHA ACTUAL: " + fechaActual;
            }
        } catch (error) {
            throw new Error("Error en turno.service | DUPLICAR TURNO " + error.message);
        }
    }

    static async modificarTurno (id, body) {
        try {
            const turnoOriginal = await this.obtenerPorId(id);

            // Verificar si la fecha se modificó
            const fechaOriginal = new Date(turnoOriginal.fecha);
            const fechaNueva = new Date(body.fecha);
            fechaOriginal.setHours(0, 0, 0, 0);
            fechaNueva.setHours(0, 0, 0, 0);

            let validacionFecha = true;
            if (fechaOriginal.getTime() !== fechaNueva.getTime()) {
                validacionFecha = await this.#validarFecha(body.fecha);
            }
            const validarEstado = await this.#validarPertenenciaEstado(body.estado);
            body.estado = validarEstado;
            const existeDuplicado = await this.#existeUnoDistinto(body.profesional, body.consultorio, body.fecha, body.hora, id);
            if (validacionFecha && existeDuplicado) {
                const response = await turnoRepository.actualizar(id, body);
                return response;
            } else {
                const fechaActual = new Date();
                fechaActual.setHours(0, 0, 0, 0);
                return "No se puede modificar un turno y poner una fecha menor a la fecha actual. FECHA ACTUAL: " + fechaActual + `. O existe un registro duplicado`;
            }
        } catch (error) {
            throw new Error("Error en turno.service | MODIFICAR " + error.message);
        }
    }

    static async elimiarTurno (id) {
        try {
            const response = await turnoRepository.eliminar(id);
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | ELIMINAR " + error.message);
        }
    }

    static async obtenerTurnosFuturos () {
        try {
            const response = await turnoRepository.obtenerTurnosFuturos();
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER TURNOS FUTUROS " + error.message);
        }
    }

    static async obtenerUno (body) {
        try {
            const response = await turnoRepository.obtenerUno(body);
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER UNO " + error.message);
        }
    }

    static async obtenerExistente (body) {
        try {
            const response = await this.#existeUnoDistinto(body.profesional, body.consultorio, body.fecha, body.hora, body.idTurno);
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER EXISTENTE " + error.message);
        }
    }

    static async obtenerIgualDatos (body) {
        try {
            const response = await this.#existeDuplicado(body.profesional, body.consultorio, body.fecha, body.hora);
            return response;
        } catch (error) {
            throw new Error("Error en turno.service | OBTENER EXISTENTE " + error.message);
        }
    }

    // Metodos privados
    static async #validarFecha (fecha) {
        try {
            const fechaActual = new Date();
            // Porque el siguiente bloque?: Debido a un problema de uso horario.
            const [a, m, d] = fecha.split("-").map(Number);
            const fechaTurno = new Date(a, m - 1, d); // Mes -1 porque enero = 0

            fechaActual.setHours(0, 0, 0, 0);
            fechaTurno.setHours(0, 0, 0, 0);

            const diferencia = fechaTurno.getTime() - fechaActual.getTime();
            if (diferencia >= 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Error en turno.service | VALIDAR FECHA " + error.message);
        }
    }

    static async #existeDuplicado (prof, cons, fechaTurno, horaTurno) {
        try {
            const duplicado = await turnoRepository.existeDuplicado(prof, cons, fechaTurno, horaTurno);
            let resultado = null;
            (duplicado === null) ? resultado = true : resultado = false;
            return resultado;
        } catch (error) {
            throw new Error("Error en turno.service | EXISTE DUPLICADO " + error.message);
        }
    }

    static async #existeUnoDistinto (prof, cons, fechaTurno, horaTurno, id) {
        try {
            const duplicado = await turnoRepository.existeUnoDistinto(prof, cons, fechaTurno, horaTurno, id);
            if (duplicado === null) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Error en turno.service | EXISTE UNO DISTINTO " + error.message);
        }
    }

    static async #validarPertenenciaEstado (est) {
        try {
            const arrayEstados = ['disponible', 'reservado', 'cancelado']
            if (arrayEstados.includes(est)) {
                return est;
            } else {
                return 'disponible';
            }
        } catch (error) {
            throw new Error("Error en turno.service | VALIDAR PERTENENCIA ESTADO " + error.message);
        }
    }
}

export default TurnoService;