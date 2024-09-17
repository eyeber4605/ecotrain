const db = require('../lib/database');
const table = 'tbAdmin';

class Model {
    static async list() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table}`;
            db.query(query, (err, data, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = Model;