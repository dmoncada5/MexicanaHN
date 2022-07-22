const sql = require('mssql/msnodesqlv8')
    //prueba--
const config = {
    user: 'sa',
<<<<<<< HEAD
   password: 'Genesis2022',
    //password: 'ejrolo59',
    
   // password: 'albertom',
=======
    //password: 'Genesis2022',
    password: 'ejrolo59',
    //password: 'albertom',
>>>>>>> 04e50a7df8ce827154598b8b0726b98f05bd0957
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