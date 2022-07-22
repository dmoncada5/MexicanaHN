const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/inventario/QueryInventario.json');

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


    async getPrice(req, res) {
 
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('Pricelist', sql.Int, req.body.Pricelist)
                .query(queries.getPrice)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getInfo(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('Pricelist', sql.Int, req.body.Pricelist)
                .query(queries.getInfo)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getInfo2(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .query(queries.getInfo2)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getInfoComp(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                // .input('Pricelist', sql.Int, req.body.Pricelist)
                .query(queries.getInfoComp)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async getExistencia(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .query(queries.getExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async ExecExistencia(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()

            .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.NVarChar, req.body.cbod)
                .input('tipo', sql.NVarChar, req.body.tipo)
                .query(queries.ExecExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }





    async setExistencia(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .input('cantidad', sql.Int, req.body.cantidad)
                .query(queries.setExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async setComprometido(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .input('cantidad', sql.Int, req.body.cantidad)
                .query(queries.setcomprometido)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }




    async pedidoExistencia(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .input('cantidad', sql.Int, req.body.cantidad)
                .query(queries.pedidoExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async ordenExistencia(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .input('cantidad', sql.Int, req.body.cantidad)
                .query(queries.ordenExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async comprasExistencia(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .input('cantidad', sql.Int, req.body.cantidad)
                .query(queries.comprasExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async getNCExistencia(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('cbod', sql.Int, req.body.cbod)
                .input('cantidad', sql.Int, req.body.cantidad)
                .query(queries.NCExistencia)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }





}
const controller = new MainController()
module.exports = controller;