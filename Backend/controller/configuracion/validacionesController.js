const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryValidaciones.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAll(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAll)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async updateData(req, res) {


        console.log('valido',req.body)
        try {
        
                const pool = await poolPromise
                const result = await pool.request()
                    .input('validacionid', sql.Int, req.body.validacionid)
                    .input('valido', sql.Bit, req.body.valido)
          
    
                .query(queries.update)
                res.json(result)
       
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    
    }




}


const controller = new MainController()
module.exports = controller;