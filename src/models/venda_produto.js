const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Sale = app.src.models.venda
    const Product = app.src.models.produtos

    const Sales_product = con.define('tb_sales_product',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_sale: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Sales_product.belongsTo(Sale, {foreignKey: 'fk_sale'})
    Sales_product.belongsTo(Product, {foreignKey: 'fk_product'})

    // Sales_product.sync({alter: true})
    return Sales_product
}