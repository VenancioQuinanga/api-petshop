const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Category = con.define('tb_category', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false
        }
    })

    // Category.sync({alter: true})
    return Category
}