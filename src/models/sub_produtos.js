const { Sequelize } = require("sequelize")


module.exports = app => {
    const con = app.src.database.connection

    const SubProduct = con.define('tb_subProducts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    })    

    // SubProduct.sync({alter: true})
    return SubProduct;
}
