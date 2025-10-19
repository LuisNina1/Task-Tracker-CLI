# 🧭 Task Tracker CLI

**Task Tracker CLI** es una aplicación de línea de comandos desarrollada para gestionar tus tareas de manera simple y eficiente directamente desde la terminal.  
Permite **agregar, actualizar, eliminar y listar tareas**, así como **marcarlas como pendientes, en progreso o completadas**.  
Las tareas se almacenan en un archivo **JSON** local, sin necesidad de usar bases de datos ni librerías externas.

---

## 🚀 Características principales

- 📥 **Agregar tareas** con una descripción.  
- ✏️ **Actualizar** la descripción de una tarea existente.  
- ❌ **Eliminar** tareas por su ID.  
- 🔄 **Cambiar el estado** de una tarea:
  - `todo` → pendiente  
  - `in-progress` → en progreso  
  - `done` → completada  
- 📋 **Listar tareas**:
  - Todas las tareas  
  - Solo las completadas (`done`)  
  - Solo las pendientes (`todo`)  
  - Solo las en progreso (`in-progress`)  
- 💾 **Persistencia de datos** en un archivo `tasks.json` (se crea automáticamente si no existe).  

---

## 🧱 Estructura de una tarea

```json
{
  "id": "c0a8017f-8f00-4000-b000-000000000001",
  "description": "Comprar leche",
  "status": "todo",
  "createdAt": "2025-10-19T15:30:00.000Z",
  "updatedAt": "2025-10-19T15:30:00.000Z"
}
```

---

## 🧩 Comandos disponibles

### ➕ Agregar una tarea
```bash
CLI> add "Comprar leche"
```
**Salida:**
```
✅ Tarea agregada correctamente (ID: 1)
```

---

### ✏️ Actualizar una tarea
```bash
CLI> update 1 "Comprar leche y pan"
```
**Salida:**
```
✅ Tarea actualizada correctamente
```

---

### ❌ Eliminar una tarea
```bash
CLI> delete 1
```
**Salida:**
```
🗑️ Tarea eliminada correctamente
```

---

### 🔄 Cambiar estado de una tarea
```bash
CLI> mark-in-progress 1
CLI> mark-done 1
```
**Salida:**
```
🚧 Tarea marcada como 'in-progress'
✅ Tarea marcada como 'done'
```

---

### 📋 Listar tareas
```bash
CLI> list
```
**Salida:**
```
ID         STATUS           DESCRIPTION             CREATED AT
--------------------------------------------------------------
1          done             Comprar leche           19/10/2025, 10:20 a. m.
2          in-progress      Estudiar Node.js        19/10/2025, 10:25 a. m.
```

Listar por estado:
```bash
CLI> list-done
CLI> list-todo
CLI> list-in-progress
```

---

## 🧠 Reglas y comportamiento

- Si el archivo `tasks.json` no existe, se crea automáticamente.  
- Los IDs se generan automáticamente usando UUID.  
- Los cambios de estado actualizan el campo `updatedAt`.  
- Si intentas acceder a una tarea inexistente, se mostrará un mensaje de error amigable.  

---

## ⚙️ Instalación y uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. **Ejecutar el CLI**
   ```bash
   node todolist.js
   ```
   Ejemplo:
   ```bash
   CLI> add "Hacer ejercicios"
   ```

3. **Ver el archivo JSON generado**
   ```bash
   tasks.json
   ```

---

## 🧰 Tecnologías utilizadas

- **Node.js**
- **Módulos nativos:**
  - `fs` → manejo de archivos  
  - `path` → rutas del sistema  
  - `crypto` → generación de IDs únicos  
  - `process` → lectura de argumentos CLI  
  - `picocolors` → colores a la terminla
  - `zod` → validacion de datos

---

## 🪲 Manejo de errores

- Si el usuario no proporciona una descripción o ID, el programa muestra un mensaje claro de uso correcto.  
- Se valida que los IDs existan antes de actualizar o eliminar.  
- Si el archivo JSON está vacío o corrupto, se inicializa automáticamente.  

---

## 🏁 Próximas mejoras (opcional)

- 🔍 Permitir búsqueda de tareas por palabra clave.  
- ⚡ Añadir soporte para prioridades (alta, media, baja).  
- 📤 Escalar a interfaz web


---

## 👨‍💻 Autor

**Luis Nina**  
📅 Proyecto creado como práctica de desarrollo de CLI en Node.js  
🌐 Inspirado por el reto “Task Tracker CLI”  

---
