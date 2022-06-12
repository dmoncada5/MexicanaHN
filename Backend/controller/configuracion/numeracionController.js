const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryNumeracion.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAll(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccomp', sql.Int, req.body.ccomp)
                .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateCorrelativo(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('cnum', sql.NVarChar, req.body.cnum)
                .query(queries.updatecorrelativo)
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
                .input('cnum', sql.NVarChar, req.body.cnum)
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

            .input('Serie', sql.NVarChar, req.body.Serie)
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('csuc', sql.NVarChar, req.body.csuc)
                .input('cai', sql.VarChar, req.body.cai)
                .input('fact_emini', sql.VarChar, req.body.fact_emini)
                .input('fact_emifin', sql.VarChar, req.body.fact_emifin)
                .input('correo', sql.NVarChar, req.body.correo)
                .input('fecha_limite', sql.Date, req.body.fecha_limite)
                .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                .input('correlativo', sql.Int, req.body.correlativo)
                .input('tipo_documento', sql.VarChar, req.body.tipo_documento)
                .input('prefijo', sql.VarChar, req.body.prefijo)
                .input('estado', sql.VarChar, req.body.estado)

            .query(queries.addNewNumeracion)

            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateData(req, res) {

        try {
            if (req.body.cnum != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cnum', sql.Int, req.body.cnum)
                    .input('Serie', sql.NVarChar, req.body.Serie)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('cai', sql.VarChar, req.body.cai)
                    .input('fact_emini', sql.VarChar, req.body.fact_emini)
                    .input('fact_emifin', sql.VarChar, req.body.fact_emifin)
                    .input('correo', sql.NVarChar, req.body.correo)
                    .input('fecha_limite', sql.Date, req.body.fecha_limite)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('correlativo', sql.Int, req.body.correlativo)
                    .input('tipo_documento', sql.VarChar, req.body.tipo_documento)
                    .input('prefijo', sql.VarChar, req.body.prefijo)
                    .input('estado', sql.VarChar, req.body.estado)


                .query(queries.updateNumeracionaDetails)
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
                    .input('cnum', sql.Int, req.body.cnum)
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