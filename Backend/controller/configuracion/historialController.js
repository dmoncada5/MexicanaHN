const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryHistorial.json');
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
                .input('chist', sql.NVarChar, req.body.chist)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addNewData(req, res) {

        try {
            if (req.body.chist != null && req.body.nombre != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('chist', sql.NVarChar, req.body.chist)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('csocio', sql.NVarChar, req.body.csocio)  
                    .input('producto', sql.NVarChar, req.body.producto) 
                    .input('pesoini', sql.NVarChar, req.body.pesoini) 
                    .input('pesoact', sql.NVarChar, req.body.pesoact)  
                    .input('talla', sql.VarChar, req.body.talla)
                    .input('imc', sql.VarChar, req.body.imc)
                    .input('ptr', sql.VarChar, req.body.ptr)                    
                    .input('areagrasa', sql.VarChar, req.body.areagrasa)
                    .input('areamusc', sql.VarChar, req.body.areamusc)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('fechacreacion', sql.VarChar, req.body.fechacreacion)                    
                    .query(queries.addNewHistorial)
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
            if (req.body.csocio != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                .input('chist', sql.NVarChar, req.body.chist)
                .input('newCompany', sql.NVarChar, req.body.ccomp)
                .input('newSucursal', sql.NVarChar, req.body.csuc)
                .input('newSocio', sql.NVarChar, req.body.csocio)  
                .input('newProducto', sql.NVarChar, req.body.producto) 
                .input('newInicial', sql.NVarChar, req.body.pesoini) 
                .input('NewActual', sql.NVarChar, req.body.pesoact)  
                .input('newTalla', sql.VarChar, req.body.talla)
                .input('newImc', sql.VarChar, req.body.imc)
                .input('newPtr', sql.VarChar, req.body.ptr)                    
                .input('newGrasa', sql.VarChar, req.body.areagrasa)
                .input('newMusc', sql.VarChar, req.body.areamusc)
                .input('newEstado', sql.VarChar, req.body.estado)
                .input('NEWffecha', sql.VarChar, req.body.fechacreacion) 
                    .query(queries.updateHistorialDetails)
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
            if (req.body.chist != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('chist', sql.VarChar, req.body.chist)
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