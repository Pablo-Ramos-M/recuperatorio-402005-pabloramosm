// Import de hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import de services del frontend
import centroService from "../services/centro.service.js";
import turnosService from "../services/turnos.service.js";

function ListadoTurnos () {
    // ------------- Variables con Estado -------------
    const [centros, setCentros] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [filtros, setFiltros] = useState({
        prof: "",
        espe: "",
        fechaTurno: "",
        centro: ""
    });

    // ------------- useNavigate -------------
    const navigate = useNavigate();

    // ------------- Funciones -------------
    const cargarCentros = async () => {
        try {
            const response = await centroService.obtenerTodos();
            setCentros(response);
        } catch (error) {
            throw new Error("Error en ListadoTurnos.jsx | CARGAR CENTROS " + error.message);
        }
    }

    const cargaInicial = async () => {
        try {
            const data = await turnosService.obtenerTurnosFuturos();
            setTurnos(data);
        } catch (error) {
            throw new Error("Error en ListadoTurnos | CARGA INICIAL " + error.message);
        }
    }

    const limpiarFiltros = async () => {
        try {
            setFiltros({
                prof: "",
                espe: "",
                fechaTurno: "",
                centro: ""
            });
        } catch (error) {
            throw new Error("Error en ListadoTurnos.jsx | LIMPIAR FILTROS " + error.message);
        }
    }

    const fitrarTurnos = async () => {
        try {
            const turnosFiltrados = await turnosService.obtenerFiltrado(filtros);
            setTurnos(turnosFiltrados);
        } catch (error) {
            throw new Error("Error en ListadoTurnos.jsx | FILTRAR TURNOS " + error.message);
        }
    }

    const eliminar = async (id, fec) => {
        try {
            if (confirm(`¿Seguro que quiere eliminar el turno de id: ${id}, fecha: ${fec}?`)) {
                await turnosService.elimiarTurno(id);
                cargaInicial();
            }
        } catch (error) {
            throw new Error("Error en ListadoTurnos.jsx | ELIMINAR TURNOS " + error.message);
        }
    }

    // ------------- useEffect -------------
    useEffect(() => {
        document.title = "Listado de Turnos";
        limpiarFiltros();
        cargarCentros();
        cargaInicial();
    },[]);

    return (
        <>
            <div className="conteiner mt-3 mb-3">
                <div className="titulo">
                    <h1>Listado de Turnos</h1>
                </div>
                <div className="filtros mt-3">
                    <div className="row g-3 mt-3">
                        <div className="col-md-4">
                            <label htmlFor="pro-txt">Filtrar por profesional: </label>
                                <input
                                    id="pro-txt"
                                    type="text"
                                    placeholder="Profesional"
                                    className="form-control"
                                    value={filtros.prof}
                                    onChange={(e) => setFiltros({...filtros, prof: e.target.value})}
                                />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="esp-txt">Filtrar por especialidad: </label>
                                <input
                                    id="esp-txt"
                                    type="text"
                                    placeholder="Especialidad"
                                    className="form-control"
                                    value={filtros.espe}
                                    onChange={(e) => setFiltros({...filtros, espe: e.target.value})}
                                />
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-4">
                            <label htmlFor="sel-centro">Seleccione un centro: </label>
                                <select 
                                    className="form-select" 
                                    id="sel-centro"
                                    value={filtros.centro}
                                    onChange={(e) => setFiltros({...filtros, centro: e.target.value})}>
                                        <option key={""} value={""}>Todos</option>
                                        {centros.map((e) => (
                                            <option key={e.idCentro} value={e.idCentro}>{e.nombre}</option>
                                        ))}
                                </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="fecha-turno">Filtrar por fecha: </label>
                                <input
                                    id="fecha-turno"
                                    type="date"
                                    placeholder="YYYY-MM_DD"
                                    className="form-control"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={filtros.fechaTurno}
                                    onChange={(e) => setFiltros({...filtros, fechaTurno: e.target.value})}
                                />
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-3">
                            <button type="button" className="btn btn-primary" onClick={fitrarTurnos}>Filtrar</button>
                        </div>
                        <div className="col-md-3">
                            <button type="button" className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar Filtros</button>
                        </div>
                        <div className="col-md-3">
                            <button type="button" className="btn btn-secondary" onClick={cargaInicial}>Recargar Listado</button>
                        </div>
                    </div>
                </div>
                <table className="table table-sm table-striped table-bordered align-middle mt-3">
                    <thead className="table-info">
                        <tr>
                            <th>Profesional</th>
                            <th>Especialidad</th>
                            <th>Fecha Turno</th>
                            <th>Hora Turno</th>
                            <th>Consultorio</th>
                            <th>Centro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.map((e) => (
                            <tr key={e.idTurno}>
                                <td>{e.profesional}</td>
                                <td>{e.especialidad}</td>
                                <td>{e.fecha}</td>
                                <td>{e.hora}</td>
                                <td>{e.consultorio}</td>
                                <td>{e.centro?.nombre}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => eliminar(e.idTurno, e.fecha)}>Eliminar</button>
                                    <button type="button" className="btn btn-outline-warning" onClick={() => 
                                        navigate(`/formulario/${e.idTurno}`, {state: {modo: "editar"}})}>Editar</button>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => 
                                        navigate(`/formulario/${e.idTurno}`, {state: {modo: "duplicar"}})}>Duplicar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListadoTurnos;