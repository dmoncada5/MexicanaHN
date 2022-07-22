const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/ventas/QueryTStock.json');
var queries = JSON.parse(rawdata);

class MainController {




    async widgetFactura(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.widgetFactura)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async widbanner(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.widbanner)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async widTop10(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.widTop10)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getAll(req, res) {
        console.log('entro', req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('tipo_documento', sql.NVarChar, req.body.tipo_documento)
                .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getAllP(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllDataP)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async getNumero(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('tipo_documento', sql.NVarChar, req.body.tipo_documento)
                .query(queries.getCorrelativo)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async upStatus(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('status', sql.Char, req.body.status)
                .input('DocNum', sql.NVarChar, req.body.DocNum)
                // .input('DocNum', sql.Int, req.body.DocNum) //lo que cambie 
                .query(queries.updateSatustraslado)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async formato(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('numero', sql.Int, req.body.numero)
                .query(queries.formato)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getOneNumero(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('tipo_documento', sql.NVarChar, req.body.tipo_documento)
                .input('csuc', sql.Int, req.body.csuc)
                .query(queries.getOneCorrelativo)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async getOneEncabezado(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('DocNum', sql.NVarChar, req.body.DocNum)
                .query(queries.getOneEncabezado)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    //NO TOQUES NI VERSH////////////
    async getOneEncabezadoBuscar(req, res) {
            console.log(req.body)
            try {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('numero', sql.NVarChar, req.body.DocNum)
                    .query(queries.getOneEncabezadoB)
                res.json(result.recordset)
            } catch (error) {
                res.status(500)
                res.send(error.message)
            }
        }
        ////////////////////////////////////////////


    async getOneDetalle(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('DocNum', sql.NVarChar, req.body.DocNum)
                .query(queries.getOneDetalle)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewDataEncabezado(req, res) {
        console.log('entro', req.body)
        try {
            if (req.body.UserCreate != null) {
                const pool = await poolPromise
                const result = await pool.request()

                .input('fechaDoc', sql.DateTime, req.body.fechaDoc)
                    .input('UserCreate', sql.NVarChar, req.body.UserCreate)
                    .input('comentarios', sql.NVarChar, req.body.comentarios)
                    .input('LastUpdate', sql.DateTime, req.body.LastUpdate)
                    .input('Serie', sql.NVarChar, req.body.Serie)
                    .input('ccomp', sql.Numeric, req.body.ccomp)
                    .input('numero', sql.NVarChar, req.body.numero)
                    .input('tipo', sql.NVarChar, req.body.tipo)
                    .input('status', sql.NVarChar, req.body.status)
                    .query(queries.addNewtrasladoEncabezado)

                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewDataDetalle(req, res) {

        try {
            if (req.body.DocNum != null && req.body.itemCode != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.NVarChar, req.body.DocNum)
                    .input('Linea', sql.Int, req.body.Linea)
                    .input('itemCode', sql.NVarChar, req.body.itemCode)
                    .input('itemName', sql.NVarChar, req.body.itemName)
                    .input('cantidad', sql.Int, req.body.cantidad)
                    .input('precio', sql.Numeric(7, 2), req.body.precio)
                    .input('almacenOrigen', sql.NVarChar, req.body.almacenOrigen)
                    .input('almacenDestino', sql.NVarChar, req.body.almacenDestino)
                    .query(queries.addNewtrasladoDetalle)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateDataeEncabezado(req, res) {


        try {

            const pool = await poolPromise
            const result = await pool.request()
                .input('fechaDoc', sql.DateTime, req.body.fechaDoc)
                .input('UserCreate', sql.NVarChar, req.body.UserCreate)
                .input('comentarios', sql.NVarChar, req.body.comentarios)
                .input('LastUpdate', sql.DateTime, req.body.LastUpdate)
                .input('Serie', sql.NVarChar, req.body.Serie)
                .input('ccomp', sql.Numeric, req.body.ccomp)
                .input('numero', sql.NVarChar, req.body.numero)
                .input('tipo', sql.NVarChar, req.body.tipo)
                .input('status', sql.NVarChar, req.body.status)
                .query(queries.updatetrasladoEncabezado)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async updateDataDetalle(req, res) {


        try {

            const pool = await poolPromise
            const result = await pool.request()
                .input('DocNum', sql.NVarChar, req.body.DocNum)
                .input('Linea', sql.Int, req.body.Linea)
                .input('itemCode', sql.NVarChar, req.body.itemCode)
                .input('itemName', sql.NVarChar, req.body.itemName)
                .input('cantidad', sql.Int, req.body.cantidad)
                .input('precio', sql.Numeric(7, 2), req.body.precio)
                .input('almacenOrigen', sql.NVarChar, req.body.almacenOrigen)
                .input('almacenDestino', sql.NVarChar, req.body.almacenDestino)

            .query(queries.updatetrasladoDetalle)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async deleteDataEncabezado(req, res) {
        try {
            if (req.body.cpais != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.Int, req.body.DocNum)
                    .query(queries.deleteDataEncabezadoXQ)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async deleteDataDetalle(req, res) {
        try {
            const { DocNum } = req.params;
            console.log('llego', DocNum)
            if (DocNum != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.Int, DocNum)
                    .query(queries.deletetrasladoDetalle)
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