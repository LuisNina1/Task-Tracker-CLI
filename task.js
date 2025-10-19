const fs = require('fs');
const { validateTask, validatePartialTask } = require('./schema/taks');
const { getPriority } = require('os');
const pc = require('picocolors');

// Ruta del archivo JSON
const taskJSON = './task.json';


// Función que crea o modifica el JSON
const createTask = (Task) => {
    // validar la tarea
    const result = validateTask(Task);
    if (result.error) {
        return console.log('❌ Error de validación:', result.error.errors);
    }

    let data = [];
    if (fs.existsSync(taskJSON)) {
        // Leer el archivo existente
        const fileContent = fs.readFileSync(taskJSON, 'utf-8');
        try {
            data = JSON.parse(fileContent); // convertir texto a array
        } catch (error) {
            console.log('⚠️ Error al parsear el JSON existente:', error);
        }
    }

    const newTask = {
        id: String(data.length + 1), // uuid v4
        ...result.data
    }

    data.push(newTask);
    fs.writeFileSync(taskJSON, JSON.stringify(data, null, 2), 'utf-8');
};

const updateTaskById = (id, updatedData) => {
    //leendo JSON
    let data = [];
    const jsonContent = fs.readFileSync(taskJSON, 'utf-8');
    try {
        data = JSON.parse(jsonContent); // convertir texto a array
    } catch (error) {
        console.log('⚠️ Error al parsear el JSON existente:', error);
    }

    const result = validatePartialTask(updatedData);
    const taskIndex = data.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return console.log(`❌ Tarea con ID ${id} no encontrada.`);
    }

    const updateTaks = {
        ...data[taskIndex],
        ...result.data,
        updateAt: new Date().toLocaleString()
    }

    data[taskIndex] = updateTaks;
    fs.writeFileSync(taskJSON, JSON.stringify(data, null, 2), 'utf-8');
}

const deleteTaskById = (id) => {
    let data = [];
    const jsonContent = fs.readFileSync(taskJSON, 'utf-8');

    try {
        data = JSON.parse(jsonContent); // convertir texto a array
    } catch (error) {
        console.log('⚠️ Error al parsear el JSON existente:', error);
    }
    const result = validatePartialTask(id);
    const taskIndex = data.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return console.log(`❌ Tarea con ID ${id} no encontrada.`);
    }
    data.splice(taskIndex, 1);
    fs.writeFileSync(taskJSON, JSON.stringify(data, null, 2), 'utf-8');
}

const taskList = () => {
    let tasks = JSON.parse(fs.readFileSync(taskJSON, "utf8"));
    if (tasks.length === 0) {
        console.log("📭 No hay tareas guardadas.");
    } else {
        console.log("📋 Lista de tareas:");
        console.log(
            `${pc.bold('ID'.padEnd(12))}` +
            `${pc.bold('STATUS'.padEnd(20))}` +
            `${pc.bold('DESCRIPTION'.padEnd(25))}` +
            `${pc.bold('FECHA')}`
        );

        tasks.forEach((task, i) => {

            const id = pc.blue(task.id.padEnd(10));
            const status = task.status.padEnd(19);
            const desc = pc.yellowBright(task.description.padEnd(24));
            const date = pc.cyanBright(task.createdAt);

            console.log(` ${id} ${status} ${desc} ${date}`);
        });

    }
}



const completedTasks = () => {

    let tasks = JSON.parse(fs.readFileSync(taskJSON, "utf8"));
    if (tasks.length === 0) {
        console.log("📭 No hay tareas guardadas.")
    } else {
        console.log("📋 Lista de tareas hechas:");
        console.log(
            `${pc.bold('ID'.padEnd(12))}` +
            `${pc.bold('STATUS'.padEnd(20))}` +
            `${pc.bold('DESCRIPTION'.padEnd(25))}` +
            `${pc.bold('FECHA')}`
        );
        tasks.forEach((task, i) => {
            if (task.status === "done") {
                const id = pc.blue(task.id.padEnd(10));
                const status = pc.greenBright(task.status.padEnd(19));
                const desc = pc.yellowBright(task.description.padEnd(24));
                const date = pc.cyanBright(task.createdAt);

                console.log(` ${id} ${status} ${desc} ${date}`);
            }
        });
    };
}
const notCompletedTasks = () => {
    let tasks = JSON.parse(fs.readFileSync(taskJSON, "utf8"));
    if (tasks.length === 0) {
        console.log("📭 No hay tareas guardadas.")
    } else {
        console.log("📋 Lista de tareas por hacer:")
        console.log(
            `${pc.bold('ID'.padEnd(12))}` +
            `${pc.bold('STATUS'.padEnd(20))}` +
            `${pc.bold('DESCRIPTION'.padEnd(25))}` +
            `${pc.bold('FECHA')}`
        );
        tasks.forEach((task, i) => {
            if (task.status === "in-progress" || task.status === "pending") {
                const id = pc.blue(task.id.padEnd(10));
                const status = task.status.padEnd(19);
                const desc = pc.yellowBright(task.description.padEnd(24));
                const date = pc.cyanBright(task.createdAt);
                console.log(` ${id} ${status} ${desc} ${date}`);
            }
        });
    }
}
const inprogressTasks = () => {
    let tasks = JSON.parse(fs.readFileSync(taskJSON, "utf8"));
    if (tasks.length === 0) {
        console.log("📭 No hay tareas guardadas.")
    } else {
        console.log("📋 Lista de tareas en progreso:")
        tasks.forEach((task, i) => {
            if (task.status === "in-progress") {
                const id = pc.blue(task.id.padEnd(10));
                const status = task.status.padEnd(19);
                const desc = pc.yellowBright(task.description.padEnd(24));
                const date = pc.cyanBright(task.createdAt);
                console.log(` ${id} ${status} ${desc} ${date}`);
            }
        })
    }
}

module.exports = {
    createTask,
    updateTaskById,
    deleteTaskById,
    taskList,
    completedTasks,
    notCompletedTasks,
    inprogressTasks
}