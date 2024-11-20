const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const User = app.src.models.usuario

    const Storie_logged = con.define('tb_storie_logged', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fk_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    })

    Storie_logged.belongsTo(User, {foreignKey: 'fk_user'})
    // Storie_logged.sync({alter: true})

    return Storie_logged
}