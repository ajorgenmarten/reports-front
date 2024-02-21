#!/usr/bin/env node
const fs = require('fs')
const { actionText, indexText } = require('./templates/index')
const sotresPath = `${process.cwd()}/src/stores/`

function createStore() {
    const pathBase = process.cwd()
    const path = `${pathBase}/src/stores/`
    
    if ( !fs.existsSync(path) ) {
        fs.mkdirSync( path )
    }

    const option = process.argv[2]
    const name = process.argv[3]

    switch (option) {
        case "create":
            create(name)
            break;
        case "delete":
            eliminate(name)
            break;
        default:
            console.log("❌ Solo se permite 'crearte' o 'delete' argumento.")
            break;
    }
}

function folderName(name) { return name.split(/[-_.\s]/g).join("-").toLowerCase() }

function create(name) {
    const foldername = folderName(name)
    if(!name) return console.log('❌ Establece un nombre para la store.')
    if ( fs.existsSync( sotresPath + foldername ) ) return console.log('❌ Ya rxiste esta store.')
    fs.mkdirSync( sotresPath + foldername )
    fs.writeFileSync( sotresPath + foldername + '/index.ts', parseTemplate(indexText, ['{name}', camelCase( name )]))
    fs.writeFileSync( sotresPath + foldername + '/actions.ts',  parseTemplate(actionText, ['{name}', camelCase( name )]))
    console.log(`🗃️ Store ${name} creada`);
}

function eliminate(name) {
    fs.rmSync(sotresPath + folderName(name),{ recursive: true, force: true})
    console.log(`🗃️ Store ${name} borrada ❌`)
}


/**
 * 
 * @param {string} text texto del archivo
 * @param {[string, string]} replace [buscador,reemplazo]
 * @returns {string}
 */
function parseTemplate(text, replace) {
    return text.replaceAll(replace[0], replace[1]);
}

function camelCase(text) {
    return text.toLowerCase()
    .trim()
    .split(/[.\-_\s]/g) // divide el texto en palabras
    .reduce((resultado, palabra) => resultado + palabra.charAt(0).toUpperCase() + palabra.slice(1), '');
}

createStore()