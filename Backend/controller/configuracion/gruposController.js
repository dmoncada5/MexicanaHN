const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryGrupos.json');
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
    async getAll1(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllData1)
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
                .input('grupoid', sql.NVarChar, req.body.grupoid)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {

            const pool = await poolPromise
            const result = await pool.request()

            .input('ccomp', sql.Int, req.body.ccomp)
                .input('nombre', sql.VarChar, req.body.nombre)
                .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                .input('estado', sql.VarChar, req.body.estado)
                .query(queries.addNewGrupo)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateData(req, res) {
        try {
            if (req.body.grupoid != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('grupoid', sql.Int, req.body.grupoid)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('nombre', sql.VarChar, req.body.nombre)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.updateGrupoDetails)


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
                    .input('grupoid', sql.Int, req.body.grupoid)
                    .query(queries.deleteNumeracion)
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