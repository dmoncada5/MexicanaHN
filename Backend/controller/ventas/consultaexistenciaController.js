const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/ventas/QueryConsultaExixtencia.json');
var queries = JSON.parse(rawdata);

class MainController {


    async getAllPCE(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllDataCE)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

}

const controller = new MainController()
module.exports = controller;