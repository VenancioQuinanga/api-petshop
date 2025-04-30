const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Sale = app.src.models.venda
    const Debit = app.src.models.debito
    const Credit = app.src.models.credito
    const Proform = app.src.models.proforma

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
        client_name: {
            type: Sequelize.STRING(50),
            allowNull: true,
            DefaultValue: 'Consumidor Final'
        },
        client_nif: {
            type: Sequelize.STRING(50),
            allowNull: true,
            DefaultValue: 'Consumidor Final'
        },
        fk_sale: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        fk_debit: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        fk_credit: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        fk_proform: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    })

    Invoice.belongsTo(Sale, {foreignKey: 'fk_sale'})
    Invoice.belongsTo(Proform, {foreignKey: 'fk_proform'})
    Invoice.belongsTo(Debit, {foreignKey: 'fk_debit'})
    Invoice.belongsTo(Credit, {foreignKey: 'fk_credit'})
    

    // Invoice.sync({alter: true})
    return Invoice

}
