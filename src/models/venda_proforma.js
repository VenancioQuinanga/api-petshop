const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Proform = app.src.models.proforma
    const Product = app.src.models.produtos

    const Sales_proform = con.define('tb_sales_proforms', {
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
        fk_proform: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Sales_proform.belongsTo(Proform, {foreignKey: 'fk_proform'})
    Sales_proform.belongsTo(Product, {foreignKey: 'fk_product'})

    // Sales_proform.sync({alter: true})
    return Sales_proform
}