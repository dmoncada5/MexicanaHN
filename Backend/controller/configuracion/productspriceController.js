const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryProductPrice.json');
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
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('codPrice', sql.NVarChar, req.body.codPrice)
                // .input('Pricelist', sql.NVarChar, req.body.Pricelist)
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
            if (req.body.ItemCode != null && req.body.price != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('Pricelist', sql.NVarChar, req.body.Pricelist)
                    .input('price', sql.Numeric(12, 4), req.body.price)
                    .input('CurrCode', sql.NVarChar, req.body.CurrCode)
                    .input('factor', sql.Numeric, req.body.factor)
                    .query(queries.addNewProductsPrice)

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
            // if (req.body.cprod != null && req.body.codlist != null) {
            if (req.body.ItemCode != null && req.body.price != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('newItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('newPricelist', sql.NVarChar, req.body.Pricelist)
                    .input('newPrice', sql.NVarChar(12, 4), req.body.price)
                    .input('newCurrCode', sql.NVarChar, req.body.CurrCode)
                    .input('newfactor', sql.NVarChar, req.body.factor)
                    .query(queries.updateProductsPriceDetails)
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
                    .input('ItemCode', sql.VarChar, req.body.ItemCode)
                    .query(queries.deleteProductsPrice)
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