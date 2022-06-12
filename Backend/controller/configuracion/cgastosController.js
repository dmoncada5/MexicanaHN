const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryCGastos.json');
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
                .input('ccuenta', sql.NVarChar, req.body.ccuenta)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {
            if (req.body.namecuenta != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('namecuenta', sql.NVarChar, req.body.namecuenta)

                .query(queries.addNewCGasto)
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
            if (req.body.namecuenta != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccuenta', sql.NVarChar, req.body.ccuenta)
                    .input('namecuenta', sql.NVarChar, req.body.namecuenta)


                .query(queries.updateCGastoDetails)
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
                    .input('ccuenta', sql.VarChar, req.body.ccuenta)
                    .query(queries.deleteCGasto)
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