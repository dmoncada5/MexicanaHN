const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryPrecios.json');
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
                .input('cprod', sql.NVarChar, req.body.cprod)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {
        console.log(req.body)
        try {
            if (req.body.cprod != null && req.body.codlista != null && req.body.price != null) {
                // if (req.body.codlista != null && req.body.price != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cprod', sql.NVarChar, req.body.cprod)
                    .input('codlista', sql.NVarChar, req.body.codlista)
                    .input('price', sql.VarChar, req.body.price)
                    .input('cmon', sql.NVarChar, req.body.cmon)
                    .query(queries.addNewPrecio)
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
            // if (req.body.cprod != null && req.body.codlist != null) {
            if (req.body.cprod != null && req.body.codlista != null && req.body.price != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('newCprod', sql.NVarChar, req.body.cprod)
                    .input('newCodlist', sql.NVarChar, req.body.codlista)
                    .input('newPrice', sql.VarChar, req.body.price)
                    .input('newCmon', sql.NVarChar, req.body.cmon)
                    .query(queries.updatePrecioDetails)
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
            if (req.body.cbod != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cprod', sql.VarChar, req.body.cprod)
                    .query(queries.deletePrecio)
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