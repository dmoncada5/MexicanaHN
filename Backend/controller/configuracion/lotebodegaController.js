const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryLoteBodega.json');
var queries = JSON.parse(rawdata);

class MainController {


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
                .input('clbod', sql.NVarChar, req.body.clbod)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {
            if (req.body.clbod != null && req.body.lote != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('clbod', sql.NVarChar, req.body.clbod)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('cbod', sql.NVarChar, req.body.cbod)       
                    .input('lote', sql.VarChar, req.body.lote)
                    .input('ubicacion', sql.VarChar, req.body.ubicacion)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewLoteBodega)
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
            if (req.body.lote != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                .input('clbod', sql.NVarChar, req.body.clbod)
                .input('newCompany', sql.NVarChar, req.body.ccomp)
                .input('newSucursal', sql.NVarChar, req.body.csuc)
                .input('newBodega', sql.NVarChar, req.body.cbod)       
                .input('newLote', sql.VarChar, req.body.lote)
                .input('newUbicacion', sql.VarChar, req.body.ubicacion)
                .input('newObservaciones', sql.VarChar, req.body.observaciones)
                .input('newFecha', sql.Date, req.body.fecha_creacion)
                .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateLoteBodegaDetails)
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
            if (req.body.clbod != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('clbod', sql.VarChar, req.body.clbod)
                    .query(queries.deleteLoteBodega)
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