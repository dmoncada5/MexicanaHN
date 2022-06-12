const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryGastos.json');
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
                .input('cgasto', sql.NVarChar, req.body.cgasto)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {
            if (req.body.monto != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    //.input('cgasto', sql.NVarChar, req.body.cgasto)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('ccuenta', sql.NVarChar, req.body.ccuenta)
                    .input('monto', sql.Numeric, req.body.monto)
                    .input('observaciones', sql.NVarChar, req.body.observaciones)
                    .input('fecha', sql.Date, req.body.fecha)
                    .input('tipopago', sql.NVarChar, req.body.tipopago)
                    .input('banco', sql.NVarChar, req.body.banco)

                .query(queries.addNewGasto)
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


        try {
            if (req.body.ccuenta != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cgasto', sql.Int, req.body.cgasto)
                    .input('newCompany', sql.NVarChar, req.body.ccomp)
                    .input('newSucursal', sql.NVarChar, req.body.csuc)
                    .input('newCcuenta', sql.NVarChar, req.body.ccuenta)
                    .input('newMonto', sql.Numeric, req.body.monto)
                    .input('newObservaciones', sql.NVarChar, req.body.observaciones)
                    .input('newFecha', sql.Date, req.body.fecha)
                    .input('tipopago', sql.NVarChar, req.body.tipopago)
                    .input('banco', sql.NVarChar, req.body.banco)
                .query(queries.updateGastoDetails)
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
            if (req.body.cgasto != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cgasto', sql.VarChar, req.body.cgasto)
                    .query(queries.deleteGasto)
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