import express from 'express';
import sequelize from './db.js';
// import de Middlewares
import cors from "cors";
import logger from './middlewares/logger.js';
// Import de rutas
import centroRouter from "./routes/centro.router.js";
import turnosRouter from "./routes/turno.router.js";

const app = express();
const PORT = 3000;

// Ruta principal de servidor
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Turnos en Centros de Salud Comunitarios</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Middlewares
app.use(cors());
/*
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));
*/
app.use(express.json());
app.use(logger);

// Agregar endpoints aquí
app.use("/api/centros", centroRouter);
app.use("/api/turnos", turnosRouter);

(async function start() {
    // Validar conexión a la base de datos.
    await sequelize.authenticate();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
