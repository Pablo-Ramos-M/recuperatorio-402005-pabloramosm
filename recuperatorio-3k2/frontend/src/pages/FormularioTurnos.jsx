// Import de hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
// Import de services
import turnosService from "../services/turnos.service.js";
import centroService from "../services/centro.service.js";

function FormularioTurnos () {
    // ---------- Variables con Estado ----------
    const [centros, setCentros] = useState([]);
    const [errores, setErrores] = useState("");
    const [filtros, setFiltros] = useState({
        profesional: "",
        consultorio: "",
        fecha: "",
        hora: "",
        idTurno: ""
    });

    // ---------- React Router y useForm ----------
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const modo = state?.modo || (id ? "editar" : "crear");
    /*
    Este código detecta:
        Si hay state.modo, lo usa (por ejemplo "duplicar").
        Si no hay state.modo pero hay un id, asume que es "editar".
        Si no hay id, es "crear".
    */
    const { handleSubmit, register, reset, formState: {errors}} = useForm();

    // ---------- Funciones ----------
    const onSubmit = async (data) => {
        try {
            setFiltros({
                idTurno: data.idTurno,
                profesional: data.profesional,
                fecha: data.fecha,
                hora: data.hora,
                consultorio: data.consultorio
            });
            const validacionFecha = await validarFecha(data.fecha);
            if (id) {
                const validacionExistencia = await turnosService.obtenerExistente(filtros);
                const validacionIgual = await turnosService.obtenerUno(data);
                if (modo === "duplicar") {
                    if (validacionFecha === true && validacionIgual === null) {
                        await turnosService.duplicarTurno(data);
                        navigate('/');
                    } else if (validacionFecha !== true && validacionIgual === null) {
                        setErrores(validacionFecha);
                    } else if (validacionFecha === true && validacionIgual !== null) {
                        setErrores("Tiene que modificar un dato para duplicar o esta ingresando los datos de otro turno ya existente...");
                    } else {
                        setErrores("Datos mal ingresados");
                    }
                } else {
                    if (validacionFecha === true && validacionExistencia === true) {
                        await turnosService.editarTurno(id, data);
                        navigate('/');
                    } else if (validacionFecha !== true && validacionExistencia === true) {
                        setErrores(validacionFecha);
                    } else if (validacionFecha === true && validacionExistencia !== true) {
                        setErrores("Ya existe un turno con mismo profesional, consultorio, fecha y hora...");
                    } else {
                        setErrores("Datos mal ingresados");
                    }
                }
            } else {
                const validarDatos = await turnosService.obtenerIgualDatos(filtros);
                if (validacionFecha === true && validarDatos === true) {
                    await turnosService.crearTurno(data);
                    navigate('/');
                } else if (validacionFecha !== true && validarDatos === true) {
                    setErrores(validacionFecha);
                } else if (validacionFecha === true && validarDatos !== true) {
                    setErrores("Ya existe un turno con mismo profesional, consultorio, fecha y hora...");
                } else {
                    setErrores("Datos mal ingresados");
                }
            }
        } catch (error) {
            throw new Error("Error en FormularioTurnos | ON SUBMIT " + error.message);
        }
    }

    const validarFecha = (fecha) => { 
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
                return "La fecha del turno debe ser mayor o igual a la fecha actual";
            }
        } catch (error) {
            throw new Error("Error en FormularioTurnos | VALIDAR FECHA " + error.message);
        }
    }

    // ---------- useEffect ----------
    useEffect(() => {
        centroService.obtenerTodos().then(setCentros);
        if (id) {
            if (modo === "duplicar") {
                document.title = "Duplicar Turno";
            } else {
                document.title = "Modificar Turno";
            }
            turnosService.obtenerPorId(id).then((e) => {
                reset({
                    profesional: e.profesional,
                    especialidad: e.especialidad,
                    fecha: e.fecha,
                    hora: e.hora,
                    idCentro: e.idCentro,
                    consultorio: e.consultorio
                });
            });
        } else {
            document.title = "Crear Turno"
            reset({
                profesional: "",
                especialidad: "",
                fecha: "",
                hora: "",
                idCentro: "",
                consultorio: ""
            });
        }
        setFiltros({
            profesional: "",
            consultorio: "",
            fecha: "",
            hora: "",
            idTurno: ""
        });
    },[id, reset, modo]);

    return (
        <>
            <div className="conteiner mt-3 mb-3">
                <div className="row g-3">
                    <h1>{(id) ? "Modificar | Duplicar Turno" : "Crear Turno"}</h1>
                </div>
                <div className="row g-3 mt-1">
                    <p className="text-success">
                        ATENCIÓN: Si va a duplicar un turno, asegurese de que modifique alguno de los campos. 
                        En caso de no modificar ningún campo, no se le permitirá duplicar
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3 mt-1">
                        <div className="col-md-3">
                            <label htmlFor="pro-txt">Ingrese el nombre del profesional: </label>
                                <input
                                    id="pro-txt"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Completo"
                                    {...register("profesional", {required: true})}
                                />
                            {errors.profesional && <span className="text-danger">Campo obligatorio</span>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="esp-txt">Ingrese la especialidad: </label>
                                <input
                                    id="esp-txt"
                                    type="text"
                                    className="form-control"
                                    placeholder="Especialidad"
                                    {...register("especialidad", {required: true})}
                                />
                            {errors.especialidad && <span className="text-danger">Campo obligatorio</span>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="fec-date">Seleccione una fecha mayor o igual a la fecha actual: </label>
                                <input
                                    id="fec-date"
                                    type="date"
                                    className="form-control"
                                    min={new Date().toISOString().split('T')[0]}
                                    {...register("fecha", {required: true})}
                                />
                            {errors.fecha && <span className="text-danger">Campo obligatorio</span>}
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-3">
                            <label htmlFor="hora-txt">Ingrese la hora del turno: </label>
                                <input
                                    id="hora-txt"
                                    type="time"
                                    className="form-control"
                                    placeholder="Formato = HH:MM"
                                    {...register("hora", {required: true})}
                                />
                            {errors.hora && <span className="text-danger">Campo obligatorio</span>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="cons-txt">Ingrese el consultorio: </label>
                                <input
                                    id="cons-txt"
                                    type="text"
                                    className="form-control"
                                    placeholder="Consultorio X"
                                    {...register("consultorio", {required: true})}
                                />
                            {errors.consultorio && <span className="text-danger">Campo obligatorio</span>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="centro-sel">Seleccione el centro de atención: </label>
                                <select
                                    id="centro-sel"
                                    className="form-select"
                                    {...register("idCentro", {required: true})}>
                                        <option value={""}>-</option>
                                        {centros.map((e) => (
                                            <option key={e.idCentro} value={e.idCentro}>{e.nombre}</option>
                                        ))}
                                </select>
                                {errors.idCentro && <span className="text-danger">Campo obligatorio</span>}
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                        <div className="col-md-3">
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>Cancelar</button>
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        {<p className="text-danger">{errores}</p>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormularioTurnos;