const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QuerySocios.json');
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
    async getDataClientes(req, res) { 

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.clientes)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getDataProveedores(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.proveedores)
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
                .input('csocio', sql.NVarChar, req.body.csocio)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



    async addNewData(req, res) {

        try {
            if (req.body.csocio != null && req.body.nombre != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('csocio', sql.NVarChar, req.body.csocio)
                    .input('nombre', sql.NVarChar, req.body.nombre)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('ccate', sql.NVarChar, req.body.ccate)
                    .input('grupoid', sql.NVarChar, req.body.grupoid)
                    .input('rtn', sql.VarChar, req.body.rtn)
                    .input('direccion', sql.VarChar, req.body.direccion)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('celular', sql.VarChar, req.body.celular)
                    .input('correo', sql.VarChar, req.body.correo)
                    .input('sitio_web', sql.VarChar, req.body.sitio_web)
                    .input('contacto', sql.VarChar, req.body.contacto)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('fecha_creacion', sql.VarChar, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('codlista', sql.Int, req.body.codlista)
                    .query(queries.addNewSocio)
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
            if (req.body.csocio != null && req.body.nombre != null) {

                const pool = await poolPromise
                const result = await pool.request()

                .input('csocio', sql.NVarChar, req.body.csocio)
                    .input('nombre', sql.NVarChar, req.body.nombre)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('ccate', sql.NVarChar, req.body.ccate)
                    .input('grupoid', sql.NVarChar, req.body.grupoid)
                    .input('rtn', sql.VarChar, req.body.rtn)
                    .input('direccion', sql.VarChar, req.body.direccion)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('celular', sql.VarChar, req.body.celular)
                    .input('correo', sql.VarChar, req.body.correo)
                    .input('sitio_web', sql.VarChar, req.body.sitio_web)
                    .input('contacto', sql.VarChar, req.body.contacto)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('fecha_creacion', sql.VarChar, req.body.fecha_creacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('codlista', sql.Int, req.body.codlista)
                    .query(queries.updateSocioDetails)
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
        console.log(req.body)
        try {

            const pool = await poolPromise
            const result = await pool.request()
                .input('csocio', sql.VarChar, req.body.csocio)
                .query(queries.deleteSocio)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

const controller = new MainController()
module.exports = controller;