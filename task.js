const fs = require('fs');
const { validateTask, validatePartialTask } = require('./schema/taks');
const { getPriority } = require('os');

// Ruta del archivo JSON
const taskJSON = './task.json';


// Función que crea o modifica el JSON
const createTask = (Task) => {

    const result = validateTask(Task);

    if (result.error) {
        return console.log('❌ Error de validación:', result.error.errors);
    }

    const newTask = {
        id: crypto.randomUUID(), // uuid v4
        ...result.data
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

updateTaskById('d271bf11-9271-4030-9d9f-fdd9095e4d68', { description: 'CLI UPDATE' });

const deteleTaskById = (id) => {

}

const taskList = () => {

}

const notCompletedTasks = () => {

}

const inprogressTasks = () => {

}

module.exports = {
    createTask,
    updateTaskById
}