const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Function = con.define('tb_function', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        function: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false
        }
    })

    // Function.sync()
    return Function
}