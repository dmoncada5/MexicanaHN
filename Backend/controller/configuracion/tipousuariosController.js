const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryTipoUsuarios.json');
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

    async getPermisos(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.nombrepermiso)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async getPermisosU(req, res) {

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('cuser', sql.NVarChar, req.body.cuser)
                .query(queries.permisos)
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
                .input('ctipou', sql.NVarChar, req.body.ctipou)
                .query(queries.getOne)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async ActualizarPermiso(req, res) {
        console.log(res.body)
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('cuser', sql.NVarChar, req.body.cuser)
                .input('nombre', sql.NVarChar, req.body.nombre)
                .input('estructura', sql.NVarChar, req.body.estructura)
                .input('permiso', sql.NVarChar, req.body.permiso)


            .query(queries.Actualizarpermiso)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async deleteData(req, res) {
        console.log(req.body)
        try {
            if (req.body.csuc != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('ctipou', sql.VarChar, req.body.ctipou)
                    .query(queries.deleteTipoUsuario)
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

            .input('ccomp', sql.Int, req.body.ccomp)
                .input('tipou', sql.VarChar, req.body.tipou)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('estado', sql.VarChar, req.body.estado)


            .query(queries.addNewTipoUsuario)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async updateData(req, res) {
        console.log(req.body)
        try {

            const pool = await poolPromise
            const result = await pool.request()
                .input('ctipou', sql.Int, req.body.ctipou)
                .input('ccomp', sql.Int, req.body.ccomp)
                .input('tipou', sql.VarChar, req.body.tipou)
                .input('observaciones', sql.VarChar, req.body.observaciones)
                .input('estado', sql.VarChar, req.body.estado)


            .query(queries.updateTipoUsuarioDetails)
            res.json(result)

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }

    }



}

const controller = new MainController()
module.exports = controller;