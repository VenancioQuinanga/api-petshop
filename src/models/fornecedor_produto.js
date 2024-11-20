const { Sequelize } = require("sequelize")
const { FORCE } = require("sequelize/lib/index-hints")

module.exports = app =>{
    const con = app.src.database.connection
    const Telephone = app.src.models.telefone

    const Provisioner = con.define('tb_provisioner', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(50),
            unique: true
        }, 
        fk_telephone:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })


    Provisioner.belongsTo(Telephone, {foreignKey: 'fk_telephone'})
    // Provisioner.sync({alter:true})
    return Provisioner
}