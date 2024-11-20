const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Sale = app.src.models.venda

    const Invoice = con.define('tb_invoice', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        code: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false,
        },
        fk_sale: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    })

    Invoice.belongsTo(Sale, {foreignKey: 'fk_sale'})

    // Invoice.sync({alter: true})
    return Invoice

}