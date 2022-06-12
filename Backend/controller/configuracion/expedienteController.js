const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryExpediente.json');
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
                .input('cexp', sql.Int, req.body.cexp)
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
            if (req.body.name != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    // .input('cexp', sql.NVarChar, req.body.cexp)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('name', sql.NVarChar, req.body.name)
                    // .input('producto', sql.VarChar, req.body.producto)
                    .input('pesoini', sql.NVarChar, req.body.pesoini)
                    // .input('pesoact', sql.NVarChar, req.body.pesoact)
                    .input('talla', sql.VarChar, req.body.talla)
                    .input('tallacms', sql.NVarChar, req.body.tallacms)
                    .input('imc', sql.VarChar, req.body.imc)
                    .input('ptr', sql.VarChar, req.body.ptr)
                    .input('areagrasa', sql.VarChar, req.body.areagrasa)
                    .input('areamusc', sql.VarChar, req.body.areamusc)
                    .input('fechacreacion', sql.Date, req.body.fechacreacion)
                    .input('birthdate', sql.Date, req.body.birthdate)
                    .input('telefono', sql.VarChar, req.body.telefono)
                    .input('correo', sql.VarChar, req.body.correo)
                    .input('estado', sql.VarChar, req.body.estado)

                .query(queries.addNewExpediente)
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
            if (req.body.name != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cexp', sql.NVarChar, req.body.cexp)
                    .input('newCompany', sql.NVarChar, req.body.ccomp)
                    .input('newSucursal', sql.NVarChar, req.body.csuc)
                    .input('newName', sql.NVarChar, req.body.name)
                    //.input('newProducto', sql.NVarChar, req.body.producto)
                    .input('newInicial', sql.NVarChar, req.body.pesoini)
                    // .input('newActual', sql.NVarChar, req.body.pesoact)
                    .input('newTalla', sql.VarChar, req.body.talla)
                    .input('newTallacms', sql.NVarChar, req.body.tallacms)
                    .input('newImc', sql.VarChar, req.body.imc)
                    .input('newPtr', sql.VarChar, req.body.ptr)
                    .input('newGrasa', sql.VarChar, req.body.areagrasa)
                    .input('newMusc', sql.VarChar, req.body.areamusc)
                    .input('newFecha', sql.VarChar, req.body.fechacreacion)
                    .input('newBirthdate', sql.Date, req.body.birthdate)
                    .input('newTelefono', sql.VarChar, req.body.telefono)
                    .input('newCorreo', sql.VarChar, req.body.correo)
                    .input('newEstado', sql.VarChar, req.body.estado)

                .query(queries.updateExpedienteDetails)
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
            if (req.body.cexp != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cexp', sql.VarChar, req.body.cexp)
                    .query(queries.deleteHistorial)
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