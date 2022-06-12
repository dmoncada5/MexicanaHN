const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryCategoria.json');
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

            .input('ccate', sql.Int, req.body.ccate)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {
            if (req.body.ccate != null && req.body.ccomp != null && req.body.categoria != null) {
                const pool = await poolPromise
                const result = await pool.request()

                .input('ccate', sql.Int, req.body.ccate)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('categoria', sql.VarChar, req.body.categoria)

                .query(queries.addNewCategoria)
                res.json(result)
            } else {
                res.send('All fields are required!')
            }

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateData(req, res) {
        try {
            if (req.body.ccate != null && req.body.ccomp != null && req.body.categoria != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccate', sql.Int, req.body.ccate)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('categoria', sql.VarChar, req.body.categoria)
                    .query(queries.updateCategoriaDetails)


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
            if (req.body.cnum != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccate', sql.Int, req.body.ccate)
                    .query(queries.deleteCategoria)
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