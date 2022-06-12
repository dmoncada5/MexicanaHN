const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryCitas.json');
var queries = JSON.parse(rawdata);

class MainController {


    async getAll(req, res) {
        const { exp } = req.params;


        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('exp', sql.NVarChar, exp)
                .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getAllEx(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.expedientes)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getAllDATA(req, res) {
console.log (req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('cexp', sql.Int, req.body.cexp)
                .query(queries.expedientesData)
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
                .input('ccita', sql.Int, req.body.ccita)
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
            if (req.body.cexp != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    //.input('ccita', sql.Int, req.body.ccita)
                    .input('cexp', sql.Int, req.body.cexp)

                .input('pesoini', sql.Int, req.body.pesoini)
                    .input('pesoact', sql.Int, req.body.pesoact)
                    .input('talla', sql.NVarChar, req.body.talla)
                    .input('tallacms', sql.Int, req.body.tallacms)
                    .input('imc', sql.Int, req.body.imc)
                    .input('ptr', sql.Int, req.body.ptr)
                    .input('areagrasa', sql.NVarChar, req.body.areagrasa)
                    .input('areamusc', sql.Int, req.body.areamusc)
                    .input('fechavisita', sql.Date, req.body.fechavisita)
                    .input('proximavisita', sql.Date, req.body.proximavisita)
                    .input('telefono', sql.NVarChar, req.body.telefono)
                    .input('correo', sql.NVarChar, req.body.correo)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewCita)
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

        console.log(req.body)
        try {
            if (req.body.ccita != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccita', sql.Int, req.body.ccita)
                    .input('newExp', sql.Int, req.body.cexp)
                    .input('newInicial', sql.Int, req.body.pesoini)
                    .input('newActual', sql.Int, req.body.pesoact)
                    .input('newTalla', sql.NVarChar, req.body.talla)
                    .input('newTallacms', sql.Int, req.body.tallacms)
                    .input('newImc', sql.Int, req.body.imc)
                    .input('newPtr', sql.Int, req.body.ptr)
                    .input('newGrasa', sql.NVarChar, req.body.areagrasa)
                    .input('newMusc', sql.Int, req.body.areamusc)
                    .input('newFecha', sql.Date, req.body.fechavisita)
                    .input('newProxima', sql.Date, req.body.proximavisita)
                    .input('newTelefono', sql.NVarChar, req.body.telefono)
                    .input('newCorreo', sql.NVarChar, req.body.correo)
                    .input('newEstado', sql.NVarChar, req.body.estado)
                    .query(queries.updateCitaDetails)
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
            if (req.body.ccita != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccita', sql.VarChar, req.body.ccita)
                    .query(queries.deleteCita)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async addNewProducts(req, res) {
        console.log(req.body)
        try {

            const pool = await poolPromise
            const result = await pool.request()
                // .input('ccita', sql.NVarChar, req.body.ccita)
                .input('cexp', sql.Int, req.body.cexp)
                .input('ccita', sql.Int, req.body.ccita)
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .input('ItemName', sql.NVarChar, req.body.ItemName)
                .input('cantidad', sql.Int, req.body.cantidad)
                .input('ProximaCompra', sql.Date, req.body.ProximaCompra)
                .query(queries.AddProductsCita)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getOneproductocita(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccita', sql.Int, req.body.ccita)
                .query(queries.selectProductCita)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getNumPago(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.citasnum)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async EliminarProducts(req, res) {


        const { cita } = req.params;
        const { item } = req.params;

        try {
            if (cita != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ccita', sql.Int, cita)
                    .input('ItemCode', sql.NVarChar, item)
                    .query(queries.EliminarProducts)
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