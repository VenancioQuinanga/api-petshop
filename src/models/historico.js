const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Sale = app.src.models.venda

    const History = con.define('tb_history', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        end_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            defaultValue: Sequelize.NOW
        }
    })

    // History.sync({alter:true})

    return History
}