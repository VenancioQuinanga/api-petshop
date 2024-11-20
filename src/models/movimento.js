const { Sequelize } = require("sequelize");

module.exports = app => {
    const con = app.src.database.connection;
    const Warehouse = app.src.models.armazem;
    const Product = app.src.models.produtos;

    const Moviment = con.define('tb_moviment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_warehouse: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Moviment.belongsTo(Product, {foreignKey: 'fk_product'});
    Moviment.belongsTo(Warehouse, {foreignKey: 'fk_warehouse'});

    // Moviment.sync({alter:true})
    return Moviment;
};
