const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Address = app.src.models.endereco
    const Telephone = app.src.models.telefone
    const Gender = app.src.models.genero_usuario
    const Category = app.src.models.categoria_usuario

    const Users = con.define('tb_users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,

        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        function: {
            type: Sequelize.ENUM('Veterinario','Recepcionista','Tecnico','Operador'),
            allowNull: false
        },
        fk_telephone: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_address: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_gender: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_category: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })

    Users.belongsTo(Address, {foreignKey: 'fk_address'})
    Users.belongsTo(Telephone, {foreignKey: 'fk_telephone'})
    Users.belongsTo(Gender, {foreignKey: 'fk_gender'})
    Users.belongsTo(Category, {foreignKey: 'fk_category'})

    // Users.sync({alter:true})
    return Users

}