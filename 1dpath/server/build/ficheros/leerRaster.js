"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gdal = __importStar(require("gdal"));
const fs_1 = __importDefault(require("fs"));
// import gdal from 'gdal';
const dataset = gdal.open('C:/Users/Henar/Documents/GitHub/TFGhenar2223/1dpath/server/src/ficheros/raster01.hdr');
const NCOLS_width = dataset.rasterSize.x;
const NROWS_height = dataset.rasterSize.y;
const NBANDS_bandsCount = dataset.bands.count();
const NBITS_dataTypeString = dataset.bands.get(1).dataType;
//const NBITS_dataType = parseInt(NBITS_dataTypeString); 
const NBITS_dataType = 16;
console.log(NBITS_dataTypeString);
console.log(NBITS_dataType);
const geoTransform = dataset.geoTransform;
const ULXMAP = geoTransform[0];
const XDIM = geoTransform[1];
const YDIM = -geoTransform[5];
const ULYMAP = geoTransform[3];
//const YULYMAP = ULYMAP + (dataset.rasterSize.y * YDIM);
// Obtener información de la banda
const band = dataset.bands.get(1);
const nodataValue = band.noDataValue;
console.log('\n- NROWS_height: ' + NROWS_height + '\n- NCOLS_width: ' + NCOLS_width + '\n- NBANDS_bandsCount: ' + NBANDS_bandsCount + '\n- NBITS_dataType: ' + NBITS_dataType + '\n- ULXMAP: ' + ULXMAP + '\n- ULYMAP: ' + ULYMAP + '\n- XDIM: ' + XDIM + '\n- YDIM: ' + YDIM);
console.log('\n- nodataValue: ' + nodataValue);
console.log('\n----------');
const buffer = Buffer.alloc(NCOLS_width * NROWS_height * NBITS_dataType / 8);
// Leer los datos del archivo .bil
fs_1.default.readSync(fs_1.default.openSync("C:/Users/Henar/Documents/GitHub/TFGhenar2223/1dpath/server/src/ficheros/raster01.bil", "r"), buffer, 0, buffer.length, 0);
// Procesar los valores del buffer según su tipo de datos
let offset = 0;
let values = [];
let coordenadas = [];
for (let i = 0; i < 2; i++) {
    let row = [];
    let rowCoordenadas = [];
    for (let j = 0; j < 2; j++) {
        let value;
        if (NBITS_dataType === 8) {
            value = buffer.readUInt8(offset);
        }
        else if (NBITS_dataType === 16) {
            value = buffer.readUInt16LE(offset);
        }
        else if (NBITS_dataType === 32) {
            value = buffer.readUInt32LE(offset);
        }
        else if (NBITS_dataType === 64) {
            value = buffer.readDoubleLE(offset);
        }
        row.push(value);
        rowCoordenadas.push([ULXMAP + j * XDIM, ULYMAP + i * YDIM]); // almacenar coordenadas de la celda actual
        offset += NBITS_dataType / 8;
    }
    values.push(row);
    coordenadas.push(rowCoordenadas);
    console.log(coordenadas);
    console.log(values);
}
console.log(values);
//console.log(coordenadas);
