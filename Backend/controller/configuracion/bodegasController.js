const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryBodegas.json');
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

    async getAllMio(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllDataMio)
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
                .input('cbod', sql.NVarChar, req.body.cbod)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getOneBodega(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccomp', sql.Int, req.body.ccomp)
                .query(queries.getBodega)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async addNewData(req, res) {
        console.log(req.body)
        try {
            if (req.body.bodega != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    // .input('cbod', sql.NVarChar, req.body.cbod)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('bodega', sql.VarChar, req.body.bodega)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewBodega)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewDataExistencia(req, res) {
        console.log(req.body)
        try {
            if (req.body.bodega != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccomp', sql.NVarChar, req.body.ccomp)

                .query(queries.addNewDataExistencia)
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

        console.log(req.body)
        try {
            if (req.body.bodega != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cbod', sql.NVarChar, req.body.cbod)
                    .input('newCompany', sql.NVarChar, req.body.ccomp)
                    .input('newSucursal', sql.NVarChar, req.body.csuc)
                    .input('newBodega', sql.VarChar, req.body.bodega)
                    .input('newObservaciones', sql.VarChar, req.body.observaciones)
                    .input('newFecha', sql.Date, req.body.fecha_creacion)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateBodegaDetails)
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
                    .input('cbod', sql.VarChar, req.body.cbod)
                    .query(queries.deleteBodega)
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