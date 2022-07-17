const sql = require('mssql/msnodesqlv8')

const config = {
    user: 'sa',
    // password: 'Genesis20221',
    password: 'ejrolo59',
    server: "localhost",
    database: "MexicanaHN",
    driver: 'msnodesqlv8'

}

//prueba
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql,
    poolPromise
}