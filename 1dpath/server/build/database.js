"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const keys_1 = __importDefault(require("./keys"));
const pgp = (0, pg_promise_1.default)({ /* initialization options */});
//const db = pgp('postgres://postgres:hequito62.POSTGRES@host:/database');
const db = pgp(keys_1.default.database);
db.connect()
    .then(() => {
    console.log('DB is Connected');
})
    .catch(error => {
    console.log('DB Connection Error:', error.message || error);
});
exports.default = db;
