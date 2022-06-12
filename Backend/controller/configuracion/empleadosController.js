const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryEmpleados.json');
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
                .input('cemp', sql.NVarChar, req.body.cemp)
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
            //if (req.body.nombres != null && req.body.estado != null) {
            if (req.body.cemp != null && req.body.nombres != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    //.input('cemp', sql.NVarChar, req.body.cemp)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('careat', sql.NVarChar, req.body.careat)
                    .input('nombres', sql.VarChar, req.body.nombres)
                    .input('apellidos', sql.NVarChar, req.body.apellidos)
                    .input('identidad', sql.NVarChar, req.body.identidad)
                    .input('genero', sql.NVarChar, req.body.genero)
                    .input('rtn', sql.NVarChar, req.body.rtn)
                    .input('edad', sql.NVarChar, req.body.edad)
                    .input('tipo_sangre', sql.NVarChar, req.body.tipo_sangre)
                    .input('direccion', sql.NVarChar, req.body.direccion)
                    .input('telefono', sql.NVarChar, req.body.telefono)
                    .input('celular', sql.NVarChar, req.body.celular)
                    .input('correo', sql.NVarChar, req.body.correo)
                    .input('observaciones', sql.NVarChar, req.body.observaciones)
                    .input('fecha_ingreso', sql.Date, req.body.fecha_ingreso)
                    .input('estado', sql.NVarChar, req.body.estado)
                    .query(queries.addNewEmpleados)
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
            if (req.body.cemp != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cemp', sql.NVarChar, req.body.cemp)
                    .input('newCompany', sql.NVarChar, req.body.ccomp)
                    .input('newSucursal', sql.NVarChar, req.body.csuc)
                    .input('newPais', sql.NVarChar, req.body.cpais)
                    // .input('newDepartamento', sql.NVarChar, req.body.cdepa)
                    //  .input('newMunicipio', sql.NVarChar, req.body.cmuni)
                    .input('newTrabajo', sql.NVarChar, req.body.careat)
                    .input('newNombres', sql.VarChar, req.body.nombres)
                    .input('newApellidos', sql.VarChar, req.body.apellidos)
                    .input('newIdentidad', sql.VarChar, req.body.identidad)
                    .input('newGenero', sql.VarChar, req.body.genero)
                    .input('newRtn', sql.VarChar, req.body.rtn)
                    .input('newEdad', sql.NVarChar, req.body.edad)
                    .input('newSangre', sql.VarChar, req.body.tipo_sangre)
                    .input('newDireccion', sql.VarChar, req.body.direccion)
                    .input('newTelefono', sql.VarChar, req.body.telefono)
                    .input('newCelular', sql.VarChar, req.body.celular)
                    .input('newCorreo', sql.VarChar, req.body.correo)
                    .input('newObservaciones', sql.VarChar, req.body.observaciones)
                    .input('newFecha', sql.Date, req.body.fecha_ingreso)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateEmpleadosDetails)
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
            if (req.body.cemp != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cemp', sql.VarChar, req.body.cemp)
                    .query(queries.deleteEmpleados)
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