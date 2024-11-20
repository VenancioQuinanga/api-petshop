const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Gender = con.define('tb_gender', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        gender: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        }
    })

    // Gender.sync()
    return Gender
}