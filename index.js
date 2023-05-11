const [operacion,...argumentos] = process.argv.slice(2);
const { registrar, verAgenda, limpiarAgenda } = require('./operaciones');
console.clear();
const texto = `***** Bienvenido al sistema de registro de mascotas *****\n\n*** Para registrar una nueva mascota utilice la siguiente nomenclatura ***
node index.js registrar "NOMBRE DE LA MASCOTA" "EDAD" "TIPO DE ANIMAL" "COLOR" "SINTOMAS"\n\n*** Para ver todas las citas registradas escriba ***
node index.js agenda\n\n*** Para borrar la agenda escriba ***
node index.js limpiar\n\nEscriba la opción deseada:`;

console.log(texto);

    // () => {
        switch (operacion) {
            case "agenda":
                (!argumentos.length)?verAgenda():console.log("Recuerde no ingresar información adicional");
                setTimeout(() => {
                    console.clear();
                    console.log(texto);}, 3000);
                break;
            case "registrar":
                (argumentos.length !== 5)?console.log("Debe ingresar los 5 datos obligatorios para registrar una cita"):registrar(argumentos);
                setTimeout(() => {
                    console.clear();
                    console.log(texto);}, 2000);
                break;
            case "limpiar":
                (!argumentos.length)?limpiarAgenda():console.log("Recuerde no ingresar información adicional");
                console.clear();
                console.log("Agenda limpiada con éxito")
                setTimeout(() => {
                    console.clear();
                    console.log(texto);}, 2000);
                break;
            default:
                if(argumentos.length !== 0)console.log("Ingrese una opcion válida con la información correcta");
                break;
        }
