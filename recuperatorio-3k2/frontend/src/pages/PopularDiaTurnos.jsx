import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import centroService from "../services/centro.service.js";
import turnosService from "../services/turnos.service.js";

function PopularDiaTurnos () {
    
    const { handleSubmit, register, formState: {errors} } = useForm();
    const [centros, setCentros] = useState([]);
    const [filtros, setFiltros] = useState({
            profesional: "",
            consultorio: "",
            fecha: "",
            hora: ""
        });
    const [cantidades, setCantidades] = useState({
        cantCreada: 0,
        cantDescartada: 0,
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let contCreados = 0;
            let contDescartados = 0;
            for (let i = 9; i < 18; i++) {
                const horaDate = new Date();
                horaDate.setHours(i, 0, 0, 0); // i horas, 0 minutos, 0 segundos
                const payload = {
                    ...data,
                    hora: horaDate.toTimeString().slice(0, 5), // "HH:MM"
                    estado: "disponible",
                };
                setFiltros({
                    profesional: data.profesional,
                    consultorio: data.consultorio,
                    fecha: data.fecha,
                    hora: data.hora
                });
                const validacionExistencia = await turnosService.obtenerExistente(filtros);
                if (validacionExistencia) {
                    contCreados++;
                    await turnosService.crearTurno(payload);
                } else {
                    contDescartados++;
                }
            }
            setCantidades({
                cantCreada: contCreados,
                cantDescartada: contDescartados
            });
        } catch (error) {
            throw new Error('Error en PopularDiaTurnos.jsx | ON SUBMIT ' + error.message);
        }
    }

    useEffect(() => {
        document.title = "Popular Dia Turno";
        centroService.obtenerTodos().then(setCentros);
        setFiltros({
            profesional: "",
            consultorio: "",
            fecha: "",
            hora: ""
        });
    },[]);

    return (
        <>
            <div className="conteiner mt-3 mb-3">
                <div className="row g-3">
                    <h1>Popular Dia Turnos</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3 mt-3">
                        <div className="col-md-3">
                        <label htmlFor="sel-pro">Seleccione un profesional</label>
                            <select
                                id="sel-pro"
                                className="form-select"
                                {...register("profesional", {required:true})}>
                                    <option key={""} value={""}>-</option>
                                    <option key={"Dr. Pablo"} value={"Dr. Pablo"}>Dr. Pablo</option>
                                    <option key={"Dr. Ariel"} value={"Dr. Ariel"}>Dr. Ariel</option>
                                    <option key={"Dr. Pedro"} value={"Dr. Pedro"}>Dr. Pedro</option>
                            </select>
                            {errors.profesional && <span className="text-danger">Campo obligatorio</span>}

                        </div>
                        <div className="col-md-3">
                        <label htmlFor="sel-cons">Seleccione un consultorio</label>
                            <select
                                id="sel-cons"
                                className="form-select"
                                {...register("consultorio", {required:true})}>
                                    <option key={""} value={""}>-</option>
                                    <option key={"Consultorio 1"} value={"Consultorio 1"}>Consultorio 1</option>
                                    <option key={"Consultorio 2"} value={"Consultorio 2"}>Consultorio 2</option>
                                    <option key={"Consultorio 3"} value={"Consultorio 3"}>Consultorio 3</option>
                            </select>
                            {errors.consultorio && <span className="text-danger">Campo obligatorio</span>}

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
                        <label htmlFor="sel-esp">Seleccione una especialidad</label>
                            <select
                                id="sel-esp"
                                className="form-select"
                                {...register("especialidad", {required:true})}>
                                    <option key={""} value={""}>-</option>
                                    <option key={"Traumatologia"} value={"Traumatologia"}>Traumatologia</option>
                                    <option key={"Pediatria"} value={"Pediatria"}>Pediatria</option>
                                    <option key={"Fisioterapia"} value={"Fisioterapia"}>Fisioterapia</option>
                            </select>
                            {errors.especialidad && <span className="text-danger">Campo obligatorio</span>}

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
                        <div className="col-md-3">
                            <p className="form-control"><strong>{"Cantidad creada: " + cantidades.cantCreada}</strong></p>
                        </div>
                        <div className="col-md-3">
                            <p className="form-control"><strong>{"Cantidad Descartada: " + cantidades.cantDescartada}</strong></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PopularDiaTurnos;