module.exports = app =>{
    const Crud = app.src.global.Crud
    const Model = app.src.models.estoque_produto
    const Product = app.src.models.produtos
    const SubProduct = app.src.models.sub_produtos
    const Family = app.src.models.familia_produto
    const Type = app.src.models.tipo_produto
    const Provisioner = app.src.models.fornecedor_produto
    const Telephone = app.src.models.telefone

    class Stock extends Crud{
        create(req, res){ super.create(req, res, Model) }

        async read(req, res){ 
            Model.findAll({
                attributes: ['id', 'fk_product', 'quantity', 'unity', 'date'],
                include: [
                    {
                        model: Product, attributes: ['id', 'name', 'purchase_price',
                         'price', 'fk_family', 'fk_type', 'fk_provisioner'],
                        include: [
                           {model: SubProduct, attributes: ['id', 'description']},
                           {model: Family, attributes: ['id', 'family', 'description']},
                           {model: Type, attributes: ['id', 'type', 'description']},
                           {
                                model: Provisioner, 
                                attributes: ['id', 'name', 'email', 'fk_telephone'],
                                include: [
                                    {model: Telephone, attributes: ['id', 'telephone']},
                                ]
                           },
                       ]
                    }
                ],
                raw:true
            })
            .then((data)=>{
                if(data.length != 0) res.status(200).json(data)
                else res.status(204).json({msg: 'Empty'})
            })
            .catch((error) => res.status(404).json({msg: error.message}))
        }

        async update(req, res){ 
            const params = req.params

            Model.update(req.params ,{ where: {id: params.id} })
                .then((data) => res.status(200).json({msg: 'Updated'}))
                .catch((error) => res.status(404).json({msg: error.message}))

            
        }

        delete(req, res){ super.delete(req, res, Model) }

    }

    return new Stock()
}

