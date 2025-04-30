const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Users = app.src.models.usuario
    const Client = app.src.models.cliente

    const Proform = con.define('tb_proforms', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fk_client: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        fk_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        payment: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    })

    Proform.belongsTo(Users, {foreignKey: 'fk_user'})
    Proform.belongsTo(Client, {foreignKey: 'fk_client'})
    
    // Proform.sync({alter: true})
    return Proform
}