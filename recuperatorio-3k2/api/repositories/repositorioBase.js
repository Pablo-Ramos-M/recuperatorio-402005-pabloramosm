export default class RepositorioBase {
  constructor(modelo) {
    this.modelo = modelo;
  }

  async obtenerPorId(id) {
    return this.modelo.findByPk(id);
  }

  async crear(datos) {
    return this.modelo.create(datos);
  }

  async actualizar(id, datos) {
    const instancia = await this.modelo.findByPk(id);
    if (!instancia) throw new Error(`Error: Instancia con id: ${id} no encontrada`);
    return instancia.update(datos);
  }

  async eliminar(id) {
    const instancia = await this.modelo.findByPk(id);
    if (!instancia) throw new Error(`Error: Instancia con id: ${id} no encontrada`);
    await instancia.destroy();
    return instancia;
  }
}
