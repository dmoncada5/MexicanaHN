const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryMonedas.json');
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
                .input('cmon', sql.NVarChar, req.body.cmon)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {
            if (req.body.cmon != null && req.body.moneda != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cmon', sql.NVarChar, req.body.cmon)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('moneda', sql.VarChar, req.body.moneda)
                    .input('abrev', sql.VarChar, req.body.abrev)
                    .input('pcompra', sql.Numeric, req.body.pcompra)
                    .input('pventa', sql.Numeric, req.body.pventa)
                    .input('fechaemi', sql.Date, req.body.fechaemi)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewMoneda)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateData(req, res) {

        console.log(req.body)
        try {
            if (req.body.moneda != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                .input('cmon', sql.NVarChar, req.body.cmon)
                .input('newCompany', sql.NVarChar, req.body.ccomp)
                .input('newPais', sql.NVarChar, req.body.cpais)
                .input('newMoneda', sql.VarChar, req.body.moneda)
                .input('newAbrev', sql.VarChar, req.body.abrev)
                .input('newPcompra', sql.Numeric, req.body.pcompra)
                .input('newPventa', sql.Numeric, req.body.pventa)
                .input('newFecha', sql.Date, req.body.fechaemi)
                .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateMonedaDetails)
                res.json(result)
            } else {
                res.send('All fields are required!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async deleteData(req, res) {
        try {
            if (req.body.cmon != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cmon', sql.VarChar, req.body.cmon)
                    .query(queries.deleteMoneda)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

const controller = new MainController()
module.exports = controller;