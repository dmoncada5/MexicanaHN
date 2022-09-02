const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/ventas/QueryPromo.json');
var queries = JSON.parse(rawdata);

class MainController {

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
    async getAllNP(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllDataNP)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async getAll(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('tipo', sql.NVarChar, req.body.tipo)
                .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



    async getInfo(req, res) {
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                .query(queries.getInfo)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



    async getNumero(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('tipo', sql.NVarChar, req.body.tipo)
                .query(queries.getCorrelativo)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async upStatus(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('status', sql.Char, req.body.status)
                .input('DocNum', sql.NVarChar, req.body.DocNum)
                // .input('DocNum', sql.Int, req.body.DocNum) //lo que cambie 
                .query(queries.updateSatusPromo)
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
        console.log(req.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('tipo', sql.NVarChar, req.body.tipo)
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
        console.log(req.body)
        try {
            if (req.body.ItemName != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.Int, req.body.ItemCode)
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('ItemName', sql.NVarChar, req.body.ItemName)
                    .input('FechaCreacion', sql.Date, req.body.FechaCreacion)
                    .input('impuesto', sql.NVarChar, req.body.impuesto)
                    .input('costo', sql.Numeric(12, 2), req.body.costo)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    //.input('costo', sql.Int, req.body.ccomp)
                    .query(queries.addNewPromoEncabezado)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



    // async addNewDataDetalle(req, res) {
    //     console.log('entro', req.body)
    //     try {
    //         if (req.body.DocNum != null && req.body.itemCode != null) {
    //             const pool = await poolPromise
    //             const result = await pool.request()

    //             .input('DocNum', sql.Int, req.body.DocNum)
    //                 .input('Linea', sql.Int, req.body.Linea)
    //                 .input('itemCode', sql.NVarChar, req.body.itemCode) 
    //                 .input('itemName', sql.NVarChar, req.body.itemName)
    //                 .input('cantidad', sql.Int, req.body.cantidad)
    //                 .input('precio', sql.Numeric, req.body.precio)
    //                 .input('DescuentoLine', sql.Float, req.body.DescuentoLine)
    //                 .input('impuestocod', sql.Int, req.body.impuestocod)
    //                 .input('totaLine', sql.Numeric, req.body.totaLine)
    //                 .input('almacen', sql.NVarChar, req.body.almacen)

    //             .query(queries.addNewPromoDetalle)
    //             res.json(result)
    //         } else {
    //             res.send('Please fill all the details!')
    //         }
    //     } catch (error) {
    //         res.status(500)
    //         res.send(error.message)
    //     } 
    // }

    async addNewDataDetalle(req, res) {
        console.log(req.body)
        try {
            if (req.body.itemCode != null) {
                const pool = await poolPromise
                const result = await pool.request()

                .input('DocNum', sql.NVarChar, req.body.DocNum)
                    .input('Linea', sql.Int, req.body.Linea)
                    .input('itemCode', sql.NVarChar, req.body.itemCode)
                    .input('itemName', sql.NVarChar, req.body.itemName)
                    .input('cantidad', sql.Int, req.body.cantidad)
                    .input('cbod', sql.Int, req.body.cbod)
                    .query(queries.addNewPromoDetalle)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async addNewDataPriceList(req, res) {
        console.log(req.body)
        try {
            if (req.body.ItemName != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ItemName', sql.NVarChar, req.body.ItemName)

                .query(queries.addNewDataEPriceList)
                res.json(result)
            } else {
                res.send('All fields are required!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }




    async updateDataeEncabezado(req, res) {

        console.log(req.body)
        try {
            if (req.body.ItemName != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.Int, req.body.ItemCode)
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('ItemName', sql.NVarChar, req.body.ItemName)
                    .input('FechaCreacion', sql.Date, req.body.FechaCreacion)
                    .input('impuesto', sql.NVarChar, req.body.impuesto)
                    .input('costo', sql.Numeric(12, 2), req.body.costo)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('ccomp', sql.Int, req.body.ccomp)

                .query(queries.updatePromoEncabezado)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }


    async updateDataDetalle(req, res) {
        console.log(req.body)
        try {
            if (req.body.itemCode != null) {
                const pool = await poolPromise
                const result = await pool.request()

                .input('DocNum', sql.NVarChar, req.body.DocNum)
                    .input('Linea', sql.Int, req.body.Linea)
                    .input('itemCode', sql.NVarChar, req.body.itemCode)
                    .input('itemName', sql.NVarChar, req.body.itemName)
                    .input('cantidad', sql.Int, req.body.cantidad)
                    .input('cbod', sql.Int, req.body.cbod)

                .query(queries.updatePromoDetalle)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }



    async updateNewDataPriceList(req, res) {

        console.log(req.body)
        try {
            if (req.body.ItemName != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.Int, req.body.ItemCode)
                    .input('ItemCode', sql.NVarChar, req.body.ItemCode)
                    .input('ItemName', sql.NVarChar, req.body.ItemName)
                    .input('FechaCreacion', sql.Date, req.body.FechaCreacion)
                    .input('impuesto', sql.NVarChar, req.body.impuesto)
                    .input('costo', sql.Numeric(12, 2), req.body.costo)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('estado', sql.VarChar, req.body.estado)
                    .input('ccomp', sql.Int, req.body.ccomp)
                    .query(queries.updateNewDataPriceList)
                res.json(result)
            } else {
                res.send('Please fill all the details!')
            }
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
                    .input('DocNum', sql.NVarChar, req.body.DocNum)
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

            if (DocNum != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('DocNum', sql.NVarChar, DocNum)
                    .query(queries.deletePromoDetalle)
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