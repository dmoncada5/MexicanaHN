const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryFormaPagos.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAll(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getOne(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('cformap', sql.Int, req.body.cformap)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async deleteData(req, res) {

        try {

            const pool = await poolPromise
            const result = await pool.request()
                .input('cformap', sql.Int, req.body.cformap)
                .query(queries.deleteFormaPagos)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }






    async addNewData(req, res) {

        try {

            const pool = await poolPromise
            const result = await pool.request()
                //  .input('cformap', sql.Int, req.body.cformap)
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('forma_pago', sql.VarChar, req.body.forma_pago)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('estado', sql.VarChar, req.body.estado)
                .query(queries.addNewFormaPagos)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }




    async updateData(req, res) {

        try {


            const pool = await poolPromise
            const result = await pool.request()
                .input('cformap', sql.Int, req.body.cformap)
                .input('ccomp', sql.NVarChar, req.body.ccomp)
                .input('forma_pago', sql.VarChar, req.body.forma_pago)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('estado', sql.VarChar, req.body.estado)


            .query(queries.updateFormaPagosDetails)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }

    }



}

const controller = new MainController()
module.exports = controller;