import { NavLink } from "react-router-dom";
import '../assets/css/Encabezado.css';

function Encabezado () {
    return (
        <>
            <header>
                <div className="conteiner mt-3 mb-3">
                    <div className="titulo-encabezado">
                        <h3>Gestion de Turnos en Centros de Salud Comunitarios</h3>
                    </div>
                    <div className="nav-bar">
                        <NavLink to='/' className='nav-element'>Listado de Turnos</NavLink>
                        <NavLink to='/formulario' className='nav-element'>Crear Nuevo Turno</NavLink>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Encabezado;