const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryAreaTrabajo.json');
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
                .input('careat', sql.NVarChar, req.body.careat)
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
            //if (req.body.careat != null && req.body.area != null && req.body.estado != null) {
            if (req.body.area != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    // .input('careat', sql.int, req.body.careat)
                    .input('newCompany', sql.NVarChar, req.body.ccomp)
                    .input('newArea', sql.VarChar, req.body.area)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.addNewAreaTrabajo)
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
            if (req.body.area != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('careat', sql.NVarChar, req.body.careat)
                    .input('newCompany', sql.NVarChar, req.body.ccomp)
                    .input('newArea', sql.VarChar, req.body.area)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateAreaTrabajoDetails)
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
            if (req.body.careat != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('careat', sql.int, req.body.careat)
                    .query(queries.deleteAreaTrabajo)
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