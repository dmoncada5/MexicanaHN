const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryPaises.json');
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
                .input('cpais', sql.NVarChar, req.body.cpais)
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
            if (req.body.pais != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pais', sql.NVarChar, req.body.pais)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewPais)
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
            if (req.body.pais != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('newPais', sql.NVarChar, req.body.pais)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updatePaisDetails)
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
            if (req.body.cpais != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cpais', sql.VarChar, req.body.cpais)
                    .query(queries.deletePais)
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