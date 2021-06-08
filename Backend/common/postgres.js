var pgp = require('pg-promise')(/* options */)
let db = pgp('postgres://postgres:mgonzalez@localhost:5432/gestionDeclaraciones')

module.exports = db;