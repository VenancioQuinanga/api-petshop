const { Sequelize } = require("sequelize");

module.exports = app => {
    const con = app.src.database.connection;
    const Product = app.src.models.produtos;
    const AcertType = app.src.models.tipo_acerto;

    const Inventory = con.define('tb_inventory', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });

    // Inventory.sync({alter: true})
    return Inventory;
};
