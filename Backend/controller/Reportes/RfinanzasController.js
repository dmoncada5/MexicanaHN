const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/Reportes/QueryReportes.json');
var queries = JSON.parse(rawdata);

class MainController {

    async SaldoClientes(req, res) {

        const { SocioCode } = req.params;
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('SocioCode', sql.NVarChar, req.body.SocioCode)
                .input('desde', sql.Date, req.body.desde)
                .input('hasta', sql.Date, req.body.hasta)
                .query(queries.SaldoClientes)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async pagosRecibidos(req, res) {
        console.log(req.body)

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('Desde', sql.Date, req.body.Desde)
                .input('Hasta', sql.Date, req.body.Hasta)
                .query(queries.pagosRecibidos)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async FacturaXTarjeta(req, res) {


        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('Desde', sql.Date, req.body.Desde)
                .input('Hasta', sql.Date, req.body.Hasta)
                .query(queries.FacturaXTarjeta)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async gastos(req, res) {


        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('Desde', sql.Date, req.body.Desde)
                .input('Hasta', sql.Date, req.body.Hasta)
                .query(queries.gastos)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async articulosVendidos(req, res) {


        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('Desde', sql.Date, req.body.Desde)
                .input('Hasta', sql.Date, req.body.Hasta)
                .query(queries.articulosVendidos)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



}

const controller = new MainController()
module.exports = controller;