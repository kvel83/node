const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const rutaJson = 'citas.json'
const registrar = (argumentos) => {
    let [nombre, edad, tipo, color, sintomas] = argumentos;
    console.clear();
    let nuevaCita = {
        nombre,
        edad,
        tipo,
        color,
        sintomas
    }
    fs.access(rutaJson,fs.constants.F_OK, (err) => {
        if (err){
            fs.writeFileSync('citas.json', `[${JSON.stringify(nuevaCita)}]`);
            console.log("***** Agenda Veterinaria *****");
            console.log("Cita agregada correctamente");
        }else{
            let contenidoJson = fs.readFileSync(rutaJson, 'utf-8');
            let objetoJson = JSON.parse(contenidoJson);
            objetoJson.push(nuevaCita);
            contenidoJson = JSON.stringify(objetoJson);
            fs.writeFileSync('citas.json', contenidoJson);
            console.log("***** Agenda Veterinaria *****");
            console.log("Cita agregada correctamente");
        }
    } );
}

const obtenerAgenda = () => {
    return new Promise((resolve, reject) => {
        fs.access(rutaJson,fs.constants.F_OK, (err) => {
            if (err)resolve([]);
            try{
                let contenido = fs.readFileSync(rutaJson, 'utf-8');
                resolve(JSON.parse(contenido));
            }catch(error){
                reject(error);
            }
        })
    })
}

const verAgenda = async() => {
    console.clear();
    let texto = `***** Agenda Veterinaria *****
    ***** CITAS CONFIRMADAS ******`
    console.log(texto);
    try{
        let objetoJson = await obtenerAgenda();
        if (!objetoJson || !objetoJson.length){
            console.log("entre a no hay citas");
            console.log(`\nNO HAY CITAS CONFIRMADAS`)
        }else{
            objetoJson.forEach((objeto, index) => {
                let cita = `${index+1} ) -- ${objeto.nombre} -- ${objeto.edad} -- ${objeto.tipo} -- ${objeto.color} -- ${objeto.sintomas}`;
                console.log(cita);
            });
        }
    }catch (error){console.log(error)};
}

const limpiarAgenda = () => fs.writeFileSync('citas.json', '[]');

module.exports = { registrar, verAgenda, limpiarAgenda };