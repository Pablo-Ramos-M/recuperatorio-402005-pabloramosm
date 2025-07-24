# 🏥 Pre-Enunciado de Recuperatorio

**Tema: Gestor de Turnos en Centros de Salud Comunitarios**

Fecha: Jueves 25 de Julio

El objetivo de la presente previsualización del enunciado del recuperatorio es que el alumno pueda trabajar todo lo necesario de acuerdo con las consignas aquí vertidas y subirlo a su repositorio para luego poder trabajar desde ese punto el día del recuperatorio.

Es completa responsabilidad del alumno realizar el push previo en el repositorio.

## ✅ Contexto General

Se desea construir una aplicación web que permita a los Centros de Salud Comunitarios gestionar los turnos ofrecidos por los distintos profesionales médicos. Los centros ya están cargados en la base de datos y no requieren mantenimiento (sin alta, baja ni modificación).

El sistema deberá estar compuesto por:

- Un backend en Node.js con Express y Sequelize (proyecto base provisto).
- Un frontend en React (Vite) con Bootstrap (proyecto base provisto).

### 🔖 Requisitos del Backend

Entidades involucradas:

- **Centro**: tabla preexistente con los campos `id`, `nombre`, `direccion`.

- **Turno**: debe modelar los turnos disponibles, con los campos:

  - `id`
  - `profesional`
  - `especialidad`
  - `fecha`
  - `hora`
  - `consultorio`
  - `idCentro` (clave foránea)

#### API requerida

1. Endpoint para obtener turnos futuros (donde `fecha` sea igual o mayor a la actual):

   Filtros:
   - texto parcial del nombre del profesional
   - especialidad
   - centro de salud
   - fecha específica

2. Endpoint para crear nuevos turnos:

   Validaciones:
   - No debe existir un turno repetido con:
     - mismo profesional
     - misma fecha y hora
     - mismo consultorio

   - El campo `fecha` no puede ser anterior a la fecha actual.

3. Endpoint para:
   - Modificar turnos (respetando las validaciones)
   - Eliminar turnos

### 📚 Requisitos del Frontend

Interfaz en React con Bootstrap que incluya:

1. Listado de turnos:
   - Visualización en tabla o cards
   - Filtros por profesional, especialidad, centro y fecha

2. Formulario de alta/modificación:
   - Inputs completos
   - Select para centro
   - Validaciones de unicidad y fecha

3. Botones:
   - Modificar
   - Duplicar (con validación de cambios)
   - Eliminar

### ⚡ Recursos provistos

- Proyecto backend con configuración de base de datos SQLite y modelos iniciales.
- Proyecto frontend con estructura base React + Bootstrap.

### 🚨 Importante

El día del parcial se les indicará un requerimiento adicional que deberán incorporar modificando su aplicación completa.
