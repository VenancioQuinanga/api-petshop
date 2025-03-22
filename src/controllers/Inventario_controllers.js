module.exports = app => {
  const model = app.src.models.inventario
  const InventoryProducts = app.src.models.inventario_produtos
  const Crud = app.src.global.Crud
  const Product = app.src.models.produtos
  const Provisioner = app.src.models.fornecedor_produto
  const SubProduct = app.src.models.sub_produtos
  const Family = app.src.models.familia_produto
  const Type = app.src.models.tipo_produto
  const Telephone = app.src.models.telefone
  const AcertType = app.src.models.tipo_acerto
  const Stock = app.src.models.estoque_produto

  class Inventory extends Crud{
    async create(req, res) {
      try {
        const { products } = req.body;
        
        await model.create()
          .then((data)=> {
            products.map((p)=>{
              InventoryProducts.create({
                    fk_inventory: data.id,
                    quantity: p.quantity,
                    fk_product: p.fk_product,
                    fk_acert_type: p.fk_acert_type,
                })
                .then((pd)=>{
                    Stock.findOne({
                        where: { fk_product: p.fk_product },
                    })
                    .then((stock)=>{
                        stock.quantity = Number(p.quantity)
                        stock.save();
                    })
                })
            })
        })
        .then((data)=> res.status(201).json({sale: data, msg: 'Created'}))
        .catch((error) => res.status(400).json({msg: error.message}))
      
      } catch (error) {
        // Trata erros
        return res.status(400).json({ msg: error.message });
      }
    }

    async read(req, res) {
      model.findAll({
        where: {},
        raw: true , 
        attributes: ['id', 'date']
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    async filter(req, res) {
      const id = req.params.params

      InventoryProducts.findAll({
        where: {
          fk_inventory: id
        },
        raw: true , 
        attributes: ['id', 'quantity', 'fk_product', 'fk_acert_type'],
        include: [
          {model: Product,
            attributes: ['id', 'name' , 'purchase_price', 'price', 'fk_subProduct',
              'fk_family', 'fk_type', 'fk_provisioner'],
            include: [
              {model: Family, attributes: ['family', 'description']},
              {model: Type, attributes: ['type', 'description']},
              {model: SubProduct, attributes: ['description']},
              {
                model: Provisioner, 
                attributes: ['id', 'name', 'email', 'fk_telephone'],
                include: [
                  {model: Telephone, attributes: ['id', 'telephone']},
                ]
              },
           ]
          },
          {model: AcertType, attributes: ['id', 'type']},
          {model: model, attributes: ['id', 'date']}
        ]
      })
      .then((data)=> {
        if (data.length != 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'})
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }

    update(req, res){ super.update(req, res, model) }
        
    delete(req, res){ super.delete(req, res, model) }
  }

  return new Inventory()
}
