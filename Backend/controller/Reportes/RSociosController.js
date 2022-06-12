const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/Reportes/QueryReportes.json');
var queries = JSON.parse(rawdata);

class MainController {

    async SociosCategoria(req, res) {

        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('categoria', sql.Int, req.body.categoria)
                .query(queries.SociosCategoria)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async SociosGrupo(req, res) {
        console.log(req.body)

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('grupo', sql.Int, req.body.grupo)
                .query(queries.SociosGrupos)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }




}

const controller = new MainController()
module.exports = controller;