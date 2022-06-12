const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryDepartamentos.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAll(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
        console.log(req)
    }

    async getOne(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('cdepa', sql.NVarChar, req.body.cdepa)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addNewData(req, res) {

        try {
            if (req.body.departamento != null && req.body.estado != null) {
                //  if (req.body.cdepa != null && req.body.departamento != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    // .input('cdepa', sql.NVarChar, req.body.cdepa)
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('departamento', sql.VarChar, req.body.departamento)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewDepartamento)
                res.json(result)

            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
        console.log(req.body)
    }
    async updateData(req, res) {

        console.log(req.body)
        try {
            if (req.body.departamento != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cdepa', sql.NVarChar, req.body.cdepa)
                    .input('newPais', sql.NVarChar, req.body.cpais)
                    .input('newDepartamento', sql.VarChar, req.body.departamento)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateDepartamentoDetails)
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
            if (req.body.cdepa != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cdepa', sql.VarChar, req.body.cdepa)
                    .query(queries.deleteDepartamento)


            } else {

                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
                // console.log(req.body)
        }
        console.log(req.body)
    }
}

const controller = new MainController()
module.exports = controller;