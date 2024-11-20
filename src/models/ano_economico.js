const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Economic_year = con.define('tb_economic_year', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        end_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        }
    })

    // Economic_year.sync({alter:true}) 
    // Economic_year.create({description: 'Ano economico 2023-2024',start_date: '2023-07-18', end_date: '2024-04-18'})
    return Economic_year
}