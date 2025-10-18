#!/usr/bin/env node
const readline = require('readline');
// Crear interfaz de lectura/escritura
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ' // símbolo que aparece esperando comandos
});

console.log('---------------- Todo lIST CLI ----------------');
rl.prompt();

// Escuchar cada línea que el usuario escriba
rl.on('line', (input) => {
    const command = input.trim();
    
    switch (command) {
        case 'hola':
            console.log('👋 ¡Hola! ¿Cómo estás?');
            break;

        case 'hora':
            console.log(`🕒 Hora actual: ${new Date().toLocaleTimeString()}`);
            break;

        case 'limpiar':
            console.clear();
            break;

        case 'exit':
        case 'salir':
            console.log('👋 Saliendo del CLI...');
            rl.close();
            return;

        default:
            console.log(`❓ Comando no reconocido: "${command}"`);
    }

    // Mostrar el prompt nuevamente
    rl.prompt();
});

// Cuando se cierra la interfaz
rl.on('close', () => {
    process.exit(0);
});