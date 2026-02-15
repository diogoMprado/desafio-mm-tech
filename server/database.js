const Datastore = require('@seald-io/nedb');

const db = new Datastore({ filename: 'funcionarios.db', autoload: true });

module.exports = db;
