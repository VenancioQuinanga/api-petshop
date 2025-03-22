module.exports = app => {
  const model = app.src.models.movimento
  const Crud = app.src.global.Crud
  const Product = app.src.models.produtos
  const Provisioner = app.src.models.fornecedor_produto
  const SubProduct = app.src.models.sub_produtos
  const Family = app.src.models.familia_produto
  const Type = app.src.models.tipo_produto
  const Telephone = app.src.models.telefone
  const Warehouse = app.src.models.armazem
  const Stock = app.src.models.estoque_produto

  class Movimemnt extends Crud{
    async create(req, res) {
      try {
        const body = req.body;
    
        // Cria o movimento
        model.create({
          quantity: body.quantity,
          fk_product: body.fk_product,
          fk_warehouse: body.fk_warehouse,
        });
    
        // Atualiza o Warehouse
        const warehouse = await Warehouse.findOne({
          where: { id: body.fk_warehouse },
        });
    
        if (warehouse) {
          warehouse.quantity = Number(warehouse.quantity) - Number(body.quantity);
          await warehouse.save();
        } else {
          return res.status(404).json({ msg: 'Warehouse not found' });
        }
    
        // Atualiza o Stock
        const stock = await Stock.findOne({
          where: { fk_product: body.fk_product },
        });
    
        if (stock) {
          stock.quantity = Number(stock.quantity) + Number(body.quantity);
          await stock.save();
        } else {
          return res.status(404).json({ msg: 'Stock not found' });
        }
    
        // Retorna sucesso
        return res.status(201).json({ msg: 'Created' });
    
      } catch (error) {
        // Trata erros
        return res.status(400).json({ msg: error.message });
      }
    }

    async acert(req, res) {
      try {
        const body = req.body;
    
        // Atualiza o Stock
        const stock = await Stock.findOne({
          where: { fk_product: body.fk_product },
        });
    
        if (stock) {
          stock.quantity = Number(body.quantity);
          await stock.save();
        } else {
          return res.status(404).json({ msg: 'Stock not found' });
        }
    
        // Retorna sucesso
        return res.status(201).json({ msg: 'Created' });
    
      } catch (error) {
        // Trata erros
        return res.status(400).json({ msg: error.message });
      }
    }

    delete(req, res){ super.delete(req, res, model) }

    async read(req, res) {
      model.findAll({
        where: {},
        raw: true , 
        attributes: ['id', 'quantity', 'date', 'fk_product', 'fk_warehouse'],
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
          {model: Warehouse, attributes: ['id', 'description']}, 
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

  return new Movimemnt()
}
