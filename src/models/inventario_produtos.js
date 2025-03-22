const { Sequelize } = require("sequelize");

module.exports = app => {
    const con = app.src.database.connection;
    const Product = app.src.models.produtos;
    const AcertType = app.src.models.tipo_acerto;
    const Inventory = app.src.models.inventario;

    const inventory_products = con.define('tb_inventory_products', {
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
        fk_inventory: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_acert_type: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    inventory_products.belongsTo(Product, {foreignKey: 'fk_product'});
    inventory_products.belongsTo(AcertType, {foreignKey: 'fk_acert_type'});
    inventory_products.belongsTo(Inventory, {foreignKey: 'fk_inventory'});

    // inventory_products.sync({alter: true})
    return inventory_products;
};
