const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/pagos/QueryPagos.json');
var queries = JSON.parse(rawdata);

class MainController {


    async getNumPago(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.pagoNum)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async Bpago(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('NDocumento', sql.VarChar, req.body.NDocumento)
                .query(queries.Bpagos)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async postPago(req, res) {

        try {
            if (req.body.pagoId != null && req.body.fechaPago != null && req.body.totalPago != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pagoId', sql.Int, req.body.pagoId)
                    .input('fechaPago', sql.Date, req.body.fechaPago)
                    .input('tipoDocumento', sql.VarChar, req.body.tipoDocumento)
                    .input('NDocumento', sql.VarChar, req.body.NDocumento)
                    .input('totalPago', sql.Numeric(25, 2), req.body.totalPago)
                    .input('status', sql.Char, req.body.status)
                    .input('formaPago', sql.VarChar, req.body.formaPago)
                    .query(queries.addPago)
                    
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async EliminarPago(req, res) {

        const { pagoId } = req.params;

        try {
            if (pagoId != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pagoId', sql.Int, pagoId)
                    .query(queries.eliminarPago)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async postEfectivo(req, res) {

        try {
            if (req.body.pagoId != null && req.body.totalEfectivo != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pagoId', sql.Int, req.body.pagoId)
                    .input('totalEfectivo', sql.Numeric(18, 2), req.body.totalEfectivo)
                    .input('nombreBancoE', sql.VarChar, req.body.nombreBancoE)

                .query(queries.addEfectivo)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async postTarjeta(req, res) {

        try {
            if (req.body.pagoId != null && req.body.totalTarjeta != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pagoId', sql.Int, req.body.pagoId)
                    .input('tarjetaNumber', sql.NVarChar, req.body.tarjetaNumber)
                    .input('FechaV', sql.Date, req.body.FechaV)
                    .input('Nombre', sql.NVarChar, req.body.Nombre)
                    .input('identidad', sql.NVarChar, req.body.identidad)
                    .input('totalTarjeta', sql.Numeric(18, 2), req.body.totalTarjeta)
                    .input('nombreBancoT', sql.VarChar, req.body.nombreBancoT)
                    .query(queries.addTarjeta)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async postCheque(req, res) {

        try {
            if (req.body.pagoId != null && req.body.totalCheque != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pagoId', sql.Int, req.body.pagoId)
                    .input('fecha', sql.Date, req.body.fecha)
                    .input('nombreBanco', sql.NVarChar, req.body.nombreBanco)
                    .input('numeroCheque', sql.NVarChar, req.body.numeroCheque)
                    .input('totalCheque', sql.Numeric(18, 2), req.body.totalCheque)



                .query(queries.addCheque)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



    async postTransferencia(req, res) {

        try {
            if (req.body.pagoId != null && req.body.totaltrans != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('pagoId', sql.Int, req.body.pagoId)
                    .input('NumeroTrans', sql.NVarChar, req.body.NumeroTrans)
                    .input('fecha', sql.Date, req.body.fecha)
                    .input('totaltrans', sql.Numeric(18, 2), req.body.totaltrans)
                    .input('nombreBancoTT', sql.VarChar, req.body.nombreBancoTT)
                    .query(queries.addTransferencia)
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