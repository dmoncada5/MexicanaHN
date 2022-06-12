const { sql, poolPromise } = require('../../db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('././Querys/QueryMunicipios.json');
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
                .input('cmuni', sql.NVarChar, req.body.cmuni)
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
            //  if (req.body.cmuni != null && req.body.municipio != null && req.body.estado != null) {
            if (req.body.municipio != null && req.body.estado != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cmuni', sql.NVarChar, req.body.cmuni)
                    .input('cdepa', sql.NVarChar, req.body.cdepa)
                    .input('cpais', sql.NVarChar, req.body.cpais)
                    .input('municipio', sql.VarChar, req.body.municipio)
                    .input('estado', sql.VarChar, req.body.estado)
                    .query(queries.addNewMunicipio)
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
            if (req.body.municipio != null && req.body.estado != null) {
                //  if (req.body.municipio != null && req.body.estado != null) {

                const pool = await poolPromise
                const result = await pool.request()
                    .input('cmuni', sql.NVarChar, req.body.cmuni)
                    .input('newPais', sql.NVarChar, req.body.cpais)
                    .input('newDepartamento', sql.NVarChar, req.body.cdepa)
                    .input('newMunicipio', sql.VarChar, req.body.municipio)
                    .input('newEstado', sql.VarChar, req.body.estado)
                    .query(queries.updateMunicipioDetails)
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
            if (req.body.cmuni != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('cmuni', sql.NVarChar, req.body.cmuni)
                    .query(queries.deleteMunicipio)
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