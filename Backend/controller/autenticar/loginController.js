const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/autenticar/QueryLogin.json');
var queries = JSON.parse(rawdata);

class MainController {


    async getOne(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('usuario', sql.NVarChar, req.body.usuario)
                .input('clave', sql.NVarChar, req.body.clave)
                .input('ccomp', sql.Int, req.body.ccomp)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getpermisos(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('usuario', sql.NVarChar, req.body.usuario)
                .input('estructura', sql.NVarChar, req.body.estructura)
                .query(queries.getPermiso)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

const controller = new MainController()
module.exports = controller;