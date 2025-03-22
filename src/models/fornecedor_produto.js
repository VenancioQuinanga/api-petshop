const { Sequelize } = require("sequelize")

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
            type: Sequelize.STRING(80),
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