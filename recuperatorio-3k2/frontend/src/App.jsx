// Import de hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import de App.css
import './assets/css/App.css';
// Import de componentes
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
// Import de las paginas
import ListadoTurnos from "./pages/ListadoTurnos.jsx";
import FormularioTurnos from "./pages/FormularioTurnos.jsx";
import PopularDiaTurnos from "./pages/PopularDiaTurnos.jsx";

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <Encabezado />
        <Routes>
          <Route path="/" element={<ListadoTurnos />} />
          <Route path="/formulario" element={<FormularioTurnos />} />
          <Route path="/formulario/:id" element={<FormularioTurnos />} />
          <Route path="/popular" element={<PopularDiaTurnos />} />
        </Routes>
        <PiePagina />
      </main>
    </BrowserRouter>
  );
}

export default App;
