const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryOrdenCompras.json');
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
                .input('cordenc', sql.NVarChar, req.body.cordenc)
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
                    .input('cordenc', sql.VarChar, req.body.cordenc)
                    .query(queries.deleteUsuario)
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

            .input('ccomp', sql.nvarchar(10) , req.body.ccomp) 
            .input('csuc', sql.nvarchar(10) , req.body.csuc)
            .input('cprov', sql.nvarchar(10) , req.body.cprov)
            .input('cprod', sql.nvarchar(10) , req.body.cprod)
            .input('cfprod', sql.nvarchar(10) , req.body.cfprod) 
            .input('cuser', sql.nvarchar(10) , req.body.cuser)
            .input('cantidad', sql.numeric(6) , req.body.cantidad)    
            .input('precio', sql.numeric(6.2) , req.body.precio)  
            .input('isv', sql.numeric(6.2) , req.body.isv)
            .input('total', sql.numeric(6.2) , req.body.total)
            .input('observaciones', sql.varchar(500), req.body.observaciones)    
            .input('fechac', sql.date, req.body.fechac) 
            .input('estado', sql.varchar(2), req.body.estado)  


            .query(queries.addNewOrdenCompra)

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
                .input('cordenc', sql.nvarchar(10) , req.body.cordenc)
                .input('ccomp', sql.nvarchar(10) , req.body.ccomp) 
                .input('csuc', sql.nvarchar(10) , req.body.csuc)
                .input('cprov', sql.nvarchar(10) , req.body.cprov)
                .input('cprod', sql.nvarchar(10) , req.body.cprod)
                .input('cfprod', sql.nvarchar(10) , req.body.cfprod) 
                .input('cuser', sql.nvarchar(10) , req.body.cuser)
                .input('cantidad', sql.numeric(6) , req.body.cantidad)    
                .input('precio', sql.numeric(6.2) , req.body.precio)  
                .input('isv', sql.numeric(6.2) , req.body.isv)
                .input('total', sql.numeric(6.2) , req.body.total)
                .input('observaciones', sql.varchar(500), req.body.observaciones)    
                .input('fechac', sql.date, req.body.fechac) 
                .input('estado', sql.varchar(2), req.body.estado)  


                .query(queries.updateOrdenCompraDetails)
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