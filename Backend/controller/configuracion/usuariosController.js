const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryUsuarios.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAll(req, res) {
        console.log(req.body)
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
                .input('cuser', sql.NVarChar, req.body.cuser)
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
                    .input('cuser', sql.VarChar, req.body.cuser)
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
        console.log(req.body)
        try {

            const pool = await poolPromise
            const result = await pool.request()
                //  .input('cuser', sql.NVarChar, req.body.cuser)
                .input('ccomp', sql.NVarChar, req.body.ccomp)
                .input('csuc', sql.NVarChar, req.body.csuc)
                .input('ctipou', sql.NVarChar, req.body.ctipou)
                .input('cemp', sql.NVarChar, req.body.cemp)
                .input('usuario', sql.VarChar, req.body.usuario)
                .input('clave', sql.VarChar, req.body.clave)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('estado', sql.VarChar, req.body.estado)

            .query(queries.addNewUsuario)

            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async updateData(req, res) {
        console.log(req.body)
        try {
            if (req.body.cuser != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cuser', sql.NVarChar, req.body.cuser)
                    .input('ccomp', sql.NVarChar, req.body.ccomp)
                    .input('csuc', sql.NVarChar, req.body.csuc)
                    .input('ctipou', sql.NVarChar, req.body.ctipou)
                    .input('cemp', sql.NVarChar, req.body.cemp)
                    .input('usuario', sql.VarChar, req.body.usuario)
                    .input('clave', sql.VarChar, req.body.clave)
                    .input('observaciones', sql.VarChar, req.body.observaciones)
                    .input('estado', sql.VarChar, req.body.estado)


                .query(queries.updateUsuarioDetails)
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