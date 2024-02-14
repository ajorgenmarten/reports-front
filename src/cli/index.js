#!/usr/bin/env node
const fs = require('fs')
const { actionText, indexText } = require('./templates/index')

function createStore() {
    const pathBase = process.cwd()
    const path = `${pathBase}/src/stores/`
    
    if ( !fs.existsSync(path) ) {
        fs.mkdirSync( path )
    }

    const name = process.argv[2]
    const folderName = name.split(/[-_.\s]/g).join("-").toLowerCase()

    if(!name) return console.log('❌ Establece un nombre para la store.')
    if ( fs.existsSync( path + folderName ) ) return console.log('❌ Ya rxiste esta store.')
    fs.mkdirSync( path + folderName )
    fs.writeFileSync( path + folderName + '/index.ts', parseTemplate(indexText, ['{name}', camelCase( name )]))
    fs.writeFileSync( path + folderName + '/actions.ts',  parseTemplate(actionText, ['{name}', camelCase( name )]))
    console.log(`🗃️ Store ${name} creada`);
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