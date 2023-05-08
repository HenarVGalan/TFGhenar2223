import pgPromise from 'pg-promise';
import keys from './keys';


const pgp = pgPromise({/* initialization options */});
//const db = pgp('postgres://postgres:hequito62.POSTGRES@host:/database');
const db = pgp(keys.database);


db.connect ()
    .then(() => {
        console.log('DB is Connected');
    })
    .catch(error => {
        console.log('DB Connection Error:', error.message || error);
    });

export default db;












