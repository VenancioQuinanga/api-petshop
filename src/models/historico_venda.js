const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Sale = app.src.models.venda
    const History = app.src.models.historico

    const history_sale = con.define('tb_sale_history', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fk_sale: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_history: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    history_sale.belongsTo(History, {foreignKey: 'fk_history'})
    history_sale.belongsTo(Sale, {foreignKey: 'fk_sale'})
    // history_sale.sync({alter:true})

    return history_sale
}