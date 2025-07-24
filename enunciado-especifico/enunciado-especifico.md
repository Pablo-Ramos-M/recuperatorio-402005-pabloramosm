# 🔖 Enunciado específico de Recuperatorio

**Objetivo:** Cambios en la Aplicación de Gestión de Turnos  
**Fecha:** Jueves 25 de Julio 15.00 h  
**Tiempo:** Tiempo asignado para solución: 1 hora 30 minutos

---

## 📊 Contexto

Partiendo del proyecto desarrollado en base al pre-enunciado titulado **"Gestor de Turnos en Centros de Salud Comunitarios"**, se solicita aplicar una modificación sobre la funcionalidad ya implementada.

---

### 💡 Cambios a implementar

#### ✅ Consigna 1: Incorporación del campo `estado` en la tabla `Turnos`

Se ha incorporado una nueva columna `estado` a la tabla `Turnos`.

Este campo puede tomar los valores: `"disponible"`, `"reservado"` o `"cancelado"`.

##### El alumno deberá:

#### 🔧 Backend

- Incluir el campo `estado` en el modelo de Turno. <--
- Adaptar los métodos de creación, edición y consulta. <--
- Validar que el valor ingresado esté entre los valores permitidos. <--
- Si no se especifica estado al crear un turno, debe asignarse `"disponible"` por defecto. <--

#### 💻 Frontend

- Mostrar el estado en el listado con algún indicador visual (badge o icono). <--
- Incluir un `select` en el formulario de alta/modificación para seleccionar estado. <--
- Validar que el campo no quede vacío. <--
- Permitir filtrar el listado por estado. <--

---

#### ✅ Consigna 2: Funcionalidad para **popular un día de turnos**

Se deberá agregar una **nueva página** en la aplicación que permita **generar automáticamente múltiples turnos** para un día determinado, con horarios predefinidos.

##### Detalles funcionales:

- El acceso a esta página debe estar disponible desde un botón visible en la navegación o listado principal, por ejemplo: `"Popular día de turnos"`.
- La nueva vista debe contener un formulario similar al de creación, que incluya:

  - Selección de **fecha**
  - Selección de **profesional**
  - Selección de **especialidad**
  - Selección de **consultorio**
  - Selección de **centro de salud**

- Al enviar el formulario, se deberán generar turnos automáticamente de 1 hora, desde las **09:00** hasta las **18:00**, es decir: 9 turnos.

- Todos los turnos creados deben tener estado `"disponible"`.

##### Validaciones requeridas:

- No deben generarse turnos si ya existen en la base datos para esa fecha, profesional, consultorio y horario.
- El backend debe validar y procesar la solicitud como una operación en bloque.
- La página debe mostrar un mensaje indicando cuántos turnos fueron generados y si hubo errores o duplicados evitados.

##### Evaluación:

- Se evaluará el correcto uso de rutas, formularios reutilizables, validaciones tanto en frontend como backend, y la claridad de la UI.

---

## ⚠ Consideraciones de Entrega

- Partir del código desarrollado en el pre-enunciado.
- Mantener todas las validaciones anteriores.
- Se valora la claridad visual, reutilización de componentes y robustez del código.
- Subir el proyecto comprimido (`api/` y `frontend/`), sin `node_modules` ni `package-lock.json`.

📦 **Entrega:** subir el ZIP del proyecto al aula virtual dentro del tiempo asignado.  
🕓 **Recordá** que el proceso de compresión y carga lleva tiempo.

---
