const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Product = app.src.models.produtos


    const Stock = con.define('tb_stock', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // Total de produtos ex: (Caixas de sabão)
        quantity:{
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0
        },
        // Todal de produtos dentro da caixa 
        // ex: (Quantidade de sabão dentro da caixa)
        unity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
    })

    Stock.belongsTo(Product, {foreignKey: 'fk_product'})
    // Stock.sync({alter: true})
    return Stock

}