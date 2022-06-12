const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryProductos.json');
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
                .input('cprod', sql.NVarChar, req.body.cprod)
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
                    .input('cprod', sql.VarChar, req.body.cprod)
                    .query(queries.deleteProducto)
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

        try {

            const pool = await poolPromise
            const result = await pool.request()
            .input('cprod', sql.NVarChar, req.body.cprod)
                .input('ccomp', sql.NVarChar, req.body.ccomp)
                .input('ccate', sql.NVarChar, req.body.ccate)
                .input('clbod', sql.NVarChar, req.body.clbod)
                .input('cprov', sql.NVarChar, req.body.cprov)
                .input('producto', sql.VarChar, req.body.producto)
                .input('costo', sql.Numeric, req.body.costo)
                .input('tipo', sql.VarChar, req.body.tipo)
                .input('compratipounidad', sql.VarChar, req.body.compratipounidad)
                .input('ventatipounidad', sql.VarChar, req.body.ventatipounidad)
                .input('impuesto', sql.Bit, req.body.impuesto)
                .input('sinexistencia', sql.Bit, req.body.sinexistencia)
                .input('fechaingreso', sql.Date, req.body.fechaingreso)
                .input('fechavenc', sql.Date, req.body.fechavenc)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('serieprod', sql.VarChar, req.body.serieprod)
                .input('estado', sql.VarChar, req.body.estado)
                .input('imagen', sql.VarChar, req.body.imagen)
            .query(queries.addNewProducto)

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
                .input('cprod', sql.NVarChar, req.body.cprod)
                .input('ccomp', sql.NVarChar, req.body.ccomp)
                .input('ccate', sql.NVarChar, req.body.ccate)
                .input('clbod', sql.NVarChar, req.body.clbod)
                .input('cprov', sql.NVarChar, req.body.cprov)
                .input('producto', sql.VarChar, req.body.producto)
                .input('costo', sql.Numeric, req.body.costo)
                .input('tipo', sql.VarChar, req.body.tipo)
                .input('compratipounidad', sql.VarChar, req.body.compratipounidad)
                .input('ventatipounidad', sql.VarChar, req.body.ventatipounidad)
                .input('impuesto', sql.Bit, req.body.impuesto)
                .input('sinexistencia', sql.Bit, req.body.sinexistencia)
                .input('fechaingreso', sql.Date, req.body.fechaingreso)
                .input('fechavenc', sql.Date, req.body.fechavenc)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('serieprod', sql.VarChar, req.body.serieprod)
                .input('estado', sql.VarChar, req.body.estado)
                .input('imagen', sql.VarChar, req.body.imagen)


                .query(queries.updateProductoDetails)
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