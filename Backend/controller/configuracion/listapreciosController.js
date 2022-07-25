const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryListaPrecios.json');
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
                .input('codlista', sql.NVarChar, req.body.codlista)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getOneProductsPrices(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('Lista', sql.Int, req.body.lista)
                .query(queries.productosWithPrice)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async ActualizarPrecio(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('price', sql.Numeric(12, 4), req.body.price)
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('Pricelist', sql.Int, req.body.Pricelist)
                .input('CurrCode', sql.NVarChar, req.body.CurrCode)
                .input('ccomp', sql.Int, req.body.ccomp)

            .query(queries.ActualizarPrecio)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewData(req, res) {

        try {
            if (req.body.lista != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    // .input('codlista', sql.NVarChar, req.body.codlista)
                    .input('lista', sql.VarChar, req.body.lista)
                    .input('fechacreacion', sql.VarChar, req.body.fechacreacion)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewListaPrecio)
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
            // if (req.body.codlist != null && req.body.estado != null) {
            if (req.body.lista != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('codlista', sql.NVarChar, req.body.codlista)
                    .input('newLista', sql.VarChar, req.body.lista)
                    .input('newFecha', sql.VarChar, req.body.fechacreacion)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateListaPrecioDetails)
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
                    .input('codlista', sql.VarChar, req.body.codlista)
                    .query(queries.deleteListaPrecio)
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