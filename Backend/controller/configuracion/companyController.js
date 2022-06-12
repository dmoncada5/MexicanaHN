const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryCompany.json');
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
                .input('ccomp', sql.NVarChar, req.body.ccomp)
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
                .input('cpais', sql.Int, req.body.cpais)
                .input('cdepa', sql.Int, req.body.cdepa)
                .input('cmuni', sql.Int, req.body.cmuni)
                .input('empresa', sql.VarChar, req.body.empresa)
                .input('empresa_sociedad', sql.VarChar, req.body.empresa_sociedad)
                .input('rtn', sql.VarChar, req.body.rtn)
                .input('sucursales', sql.Int, req.body.sucursales)
                .input('direccion', sql.VarChar, req.body.direccion)
                .input('telefono', sql.VarChar, req.body.telefono)
                .input('celular', sql.VarChar, req.body.celular)
                .input('correo', sql.VarChar, req.body.correo)
                .input('sitio_web', sql.VarChar, req.body.sitio_web)
                .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                .input('estado', sql.VarChar, req.body.estado)
                .query(queries.addNewCompany)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateData(req, res) {
        try {
            if (req.body.empresa != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('cpais', sql.Int, req.body.cpais)
                    .input('cdepa', sql.Int, req.body.cdepa)
                    .input('cmuni', sql.Int, req.body.cmuni)
                    .input('empresa', sql.VarChar, req.body.empresa)
                    .input('empresa_sociedad', sql.VarChar, req.body.empresa_sociedad)
                    .input('rtn', sql.VarChar, req.body.rtn)
                    .input('sucursales', sql.Int, req.body.sucursales)
                    .input('direccion', sql.VarChar, req.body.direccion)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('celular', sql.VarChar, req.body.celular)
                    .input('correo', sql.VarChar, req.body.correo)
                    .input('sitio_web', sql.VarChar, req.body.sitio_web)
                    .input('fecha_creacion', sql.Date, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.updateCompanyDetails)


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
                    .input('ccomp', sql.Int, req.body.ccomp)
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