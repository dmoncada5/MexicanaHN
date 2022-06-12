const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QuerySucursales.json');
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
    }
    async getOne(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('csuc', sql.NVarChar, req.body.csuc)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async deleteData(req, res) {
        try {
            if (req.body.csuc != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('csuc', sql.VarChar, req.body.csuc)
                    .query(queries.deleteSucursal)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }






    async addNewData(req, res) {
        console.log(req.body)
        try {
            if (req.body.sucursal != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()

                //.input('csuc', sql.NVarChar, req.body.csuc)
                .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('numsuc', sql.Numeric, req.body.numsuc)
                    .input('cdepa', sql.NVarChar, req.body.cdepa)
                    .input('cmuni', sql.NVarChar, req.body.cmuni)
                    .input('sucursal', sql.NVarChar, req.body.sucursal)
                    .input('direccion', sql.VarChar, req.body.direccion)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('celular', sql.VarChar, req.body.celular)
                    .input('correo', sql.VarChar, req.body.correo)
                    .input('responsable', sql.VarChar, req.body.responsable)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)

                .query(queries.addNewSucursal)
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
            if (req.body.sucursal != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('numsuc', sql.Numeric, req.body.numsuc)
                    .input('cdepa', sql.NVarChar, req.body.cdepa)
                    .input('cmuni', sql.NVarChar, req.body.cmuni)
                    .input('sucursal', sql.NVarChar, req.body.sucursal)
                    .input('direccion', sql.VarChar, req.body.direccion)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('celular', sql.VarChar, req.body.celular)
                    .input('correo', sql.VarChar, req.body.correo)
                    .input('responsable', sql.VarChar, req.body.responsable)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)


                .query(queries.updateSucursalDetails)
                res.json(result)
            } else {
                res.send('All fields are required!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }

    }



}

const controller = new MainController()
module.exports = controller;