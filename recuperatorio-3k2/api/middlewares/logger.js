function logger(req, res, next) {
  const start = Date.now(); // Obtengo la fecha con la que inicia la transaccion
  res.on("finish", () => {
    const duration = Date.now() - start; // Calcula cuántos ms tardó la respuesta

    const now = new Date();              // Obtiene la fecha y hora actual
    const fechaHora = now.toISOString(); // Formato legible: 2025-06-11T18:40:00.000Z

    // Construyo el mensaje con todos los datos
    const log = `[${fechaHora}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    console.log(log); // Imprimo en consola
  });

  next(); // Pasa al siguiente middleware o rut
}
export default logger;