module.exports = app =>{

    const sale = app.src.models.venda
    const product = app.src.models.produtos
    const Stock = app.src.models.estoque_produto
    const Provisioner = app.src.models.fornecedor_produto
    const sale_product = app.src.models.venda_produto
    const Client = app.src.models.cliente
    const users = app.src.models.usuario
    const Telephone = app.src.models.telefone
    const Gender = app.src.models.genero_usuario
    const Category = app.src.models.categoria_usuario
    const Address = app.src.models.endereco
    const SubProduct = app.src.models.sub_produtos
    const Family = app.src.models.familia_produto
    const Type = app.src.models.tipo_produto
    const Payment_type = app.src.models.tipo_pagamento

    class Sales_products{
        async create(req, res){
            const products = req.body.products
            const body = req.body
            let saleData

            sale.create({
                fk_payment_type : body.fk_payment_type,
                payment: body.payment, 
                troco: body.troco, 
                fk_user: body.fk_user,
                fk_client: body.fk_client
            })
            .then((data)=> {
                saleData = data
                products.map((p)=>{
                    sale_product.create({
                        fk_sale: data.id, 
                        fk_product: p.id,
                        quantity: p.quantity
                    })
                    .then((sale_product)=>{
                        Stock.findOne({
                            where: { fk_product: p.id },
                        })
                        .then((stock)=>{
                            stock.quantity = Number(stock.quantity) - Number(p.quantity);
                            stock.save();
                        })
                        
                    })
                })
            })
            .then((data)=> res.status(201).json({sale: saleData, msg: 'Created'}))
            .catch((error) => res.status(400).json({msg: error.message}))
        }

        async read(req, res){
            sale_product.findAll({
                where: {},
                raw: true,
                attributes: ['id', 'fk_sale', 'fk_product', 'quantity'],
                include: [
                    {
                        model: product, attributes: ['id', 'name', 'purchase_price',
                         'price', 'fk_subProduct', 'fk_family', 'fk_type', 'fk_provisioner'],
                        include: [
                            {model: Family, attributes: ['id', 'family', 'description']},
                            {model: Type, attributes: ['id', 'type', 'description']},
                            {model: SubProduct, attributes: ['description']},
                            {
                                model: Provisioner, 
                                attributes: ['id', 'name', 'email', 'fk_telephone'],
                                include: [
                                    {model: Telephone, attributes: ['id', 'telephone']},
                                ]
                            }
                       ]
                    }
                ],
            })
            .then((data)=> {
                if(data.length != 0) res.status(201).json(data)
                else res.status(204).json({msg: 'Empty'})
            })
            .catch((error) => res.status(404).json({msg: error.message}))
        }

        async filter(req, res){
            const id = req.params.params
      
            sale_product.findAll({
                where: {fk_sale: id},
                raw: true,
                attributes: ['id', 'fk_sale', 'fk_product', 'quantity'],
                include: [
                    {
                        model: product, attributes: ['id', 'name', 'purchase_price', 'fk_subProduct',
                         'price', 'fk_family', 'fk_type', 'fk_provisioner'],
                        include: [
                           {model: Family, attributes: ['id', 'family', 'description']},
                           {model: Type, attributes: ['id', 'type', 'description']},
                           {model: SubProduct, attributes: ['id', 'description']},
                           {
                                model: Provisioner, 
                                attributes: ['id', 'name', 'email', 'fk_telephone'],
                                include: [
                                    {model: Telephone, attributes: ['id', 'telephone']},
                                ]
                           }
                       ]
                    }
                ],
            })
            .then((data)=> {
                if(data.length != 0) res.status(201).json(data)
                else res.status(204).json({msg: 'Empty'})
            })
            .catch((error) => res.status(404).json({msg: error.message}))
        }
        
        async read_sales(req, res){
            sale.findAll({
                where: {},
                raw:true,
                attributes: ['id','fk_payment_type', 'payment','troco','date'],
                include: [
                    {
                        model: users, attributes: ['id', 'name', 'email', 'birth_date', 'fk_telephone',
                        'fk_address','fk_gender','fk_category'],
                        include: [
                            {model: Address, attributes: ['neighborhood','street','house']}, 
                            {model: Telephone, attributes: ['telephone']}, 
                            {model: Gender, attributes: ['gender']}, 
                            {model: Category, attributes: ['category']}
                        ]
                    }, 
                    {
                        model: Client, 
                            attributes: ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
                            include: [
                                {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                                {model: Telephone, attributes: ['telephone']}, 
                                {model: Gender, attributes: ['gender']}
                            ]
                    },
                    { model: Payment_type, attributes: ['type'] }
                ]
            })
            .then((data)=> {
                if(data.length != 0) res.status(201).json(data)
                else res.status(204).json({msg: 'Empty'})
            })
            .catch((error) => res.status(404).json({msg: error.message}))
        }

        update(){}

        delete(){}
    }

    return new Sales_products()
}