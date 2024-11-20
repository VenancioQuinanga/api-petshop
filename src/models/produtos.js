const { Sequelize } = require("sequelize")


module.exports = app => {
    const con = app.src.database.connection
    const Family = app.src.models.familia_produto
    const Type = app.src.models.tipo_produto
    const Provisioner = app.src.models.fornecedor_produto
    const SubProduct = app.src.models.sub_produtos


    const Product = con.define('tb_products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        //Preço de compra
        purchase_price: {                                                                                                        
            type: Sequelize.DECIMAL(10,0),
            allowNull: false
        },
        //Preço de venda
        price: {                                                                                                        
            type: Sequelize.DECIMAL(10,0),
            allowNull: false
        },
        manufacturing_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        expiry_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        fk_subProduct: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_family: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_provisioner: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })    

    Product.belongsTo(SubProduct, {foreignKey: 'fk_subProduct'})
    Product.belongsTo(Family, {foreignKey: 'fk_family'})
    Product.belongsTo(Type, {foreignKey: 'fk_type'})
    Product.belongsTo(Provisioner, {foreignKey: 'fk_provisioner'})

    // Product.sync({alter:true})
    return Product;
}
