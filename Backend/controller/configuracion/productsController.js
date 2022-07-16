const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryProducts.json');
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
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
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
                    .input('ItemCode', sql.VarChar, req.body.ItemCode)
                    .query(queries.deleteProduct)
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
            if (req.body.ItemName != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('ItemName', sql.NVarChar, req.body.ItemName)
                    .input('FechaCreacion', sql.Date, req.body.FechaCreacion)
                    .input('FechaVencimiento', sql.Date, req.body.FechaVencimiento)
                    .input('impuesto', sql.NVarChar, req.body.impuesto)
                    .input('costo', sql.Numeric, req.body.costo)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('propiedad', sql.VarChar, req.body.propiedad)
                    .query(queries.addNewProduct)
                res.json(result)
            } else {
                res.send('All fields are required!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewDataExistencia(req, res) {

        try {
            if (req.body.ItemName != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)

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

        try {
            if (req.body.ItemName != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('ItemName', sql.NVarChar, req.body.ItemName)
                    .input('FechaCreacion', sql.Date, req.body.FechaCreacion)
                    .input('FechaVencimiento', sql.Date, req.body.FechaVencimiento)
                    .input('impuesto', sql.NVarChar, req.body.impuesto)
                    .input('costo', sql.Numeric, req.body.costo)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .input('propiedad', sql.VarChar, req.body.propiedad)
                    .query(queries.updateProductDetails)
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