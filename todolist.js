const readline = require('readline');
const { createTask, updateTaskById, deleteTaskById, taskList, completedTasks, inprogressTasks, notCompletedTasks } = require('./task');

// Creamos la interfaz de lectura de línea
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "CLI> ", // texto que se mostrará como prompt
});

// Función para manejar comandos
function handleCommand(line) {
    const args = line.trim().split(" ");
    const command = args[0];
    const input = args.slice(1).join(" ");

    switch (command.toLowerCase()) {
        case "add":
            if (!input) {
                console.log("❌ Debes escribir una cadena después de 'add'");
            } else {
                createTask({ description: input });
                console.log(`📝 Nueva tarea agregada: "${input}"`);
                // aquí podrías guardar en un JSON, por ejemplo
            }
            break;
        case "update": {
            if (args.length < 3) {
                console.log("❌ Usa: update <id> <nuevo texto>");
            } else {
                const id = args[1];
                const newText = args.slice(2).join(" ");
                updateTaskById(id, { description: newText });
            }
            break;
        }

        case "delete": {
            id = args[1];
            if (args.length < 2) {
                console.log("❌ Usa: delete <id>");
            } else {
                const id = args[1];
                deleteTaskById(id);
            }
        }
        case "mark-in-progress": {
            if (args.length < 2) {
                console.log("❌ Usa: mark-in-progress <id>");
            } else {
                const id = args[1];
                updateTaskById(id, { status: "in-progress" });
                break;
            }
        }

        case "mark-done": {
            if (args.length < 2) {
                console.log("❌ Usa: mark-done <id>");
            } else {
                const id = args[1];
                updateTaskById(id, { status: "done" });
            }
            break;
        }
        case "list":
            taskList();
            break;
        case "list-done": {
            console.log("Tareas completadas:");
            completedTasks();
            break;
        }
        case "list-todo": {
            console.log("Tareas por hacer:");
            notCompletedTasks();
            break;
        }
        case "list-in-progress": {
            console.log("Tareas en progreso:");
            inprogressTasks();
            break;
        }

        case "help":
            console.log("Comandos disponibles:");
            console.log("  add <texto>              → Agrega una nueva tarea");
            console.log("  update <ID> <texto>      → Actualiza el texto de una tarea");
            console.log("  delete <ID>              → Elimina una tarea");
            console.log("  mark-in-progress <ID>    → Marca una tarea como 'en progreso'");
            console.log("  mark-done <ID>           → Marca una tarea como 'hecha'");
            console.log("  list done                → Lista las tareas hechas");
            console.log("  list todo                → Lista las tareas por hacer");
            console.log("  list in-progress         → Lista las tareas en progreso");
            console.log("  list                     → Lista todas las tareas");
            console.log("  exit                     → Cierra la CLI");
            break;

        case "exit":
            console.log("👋 Saliendo de la CLI...");
            rl.close(); // cierra la interfaz
            return;

        default:
            console.log("❓ Comando no reconocido. Escribe 'help' para ver los comandos.");
            break;
    }

    rl.prompt(); // vuelve a mostrar el prompt
}

// Mostrar el prompt inicial
console.log("🚀 CLI iniciada. Escribe 'help' para ver los comandos disponibles.");
rl.prompt();

// Escuchar líneas del usuario
rl.on("line", handleCommand);

// Detectar cuando se cierra
rl.on("close", () => {
    console.log("✅ CLI finalizada.");
    process.exit(0);
});