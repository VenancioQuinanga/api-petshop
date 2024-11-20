const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Gender = app.src.models.genero_usuario
    const Address = app.src.models.endereco
    const Telephone = app.src.models.telefone

    const Client = con.define('tb_client', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        nif: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        fk_address: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        fk_telephone: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        fk_gender: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Client.belongsTo(Address, {foreignKey: 'fk_address'})
    Client.belongsTo(Telephone, {foreignKey: 'fk_telephone'})
    Client.belongsTo(Gender, {foreignKey: 'fk_gender'})
    // Client.sync({alter: true})
    return Client

}