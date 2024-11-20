module.exports = app =>{
    const model = app.src.models.produtos
    const Crud = app.src.global.Crud
    const SubProduct = app.src.models.sub_produtos
    const Provisioner = app.src.models.fornecedor_produto
    const Stock = app.src.models.estoque_produto
    const Family = app.src.models.familia_produto
    const Type = app.src.models.tipo_produto
    const Telephone = app.src.models.telefone

    class Product extends Crud{

      async create(req, res) {
        const body = req.body;
    
        SubProduct.create({
          description: body['tb_subProduct.description'],
        })
        .then((subProduct) => {
          return model.create({
            name: body.name,
            purchase_price: body.purchase_price,
            price: body.price,
            manufacturing_date: body.manufacturing_date,
            expiry_date: body.expiry_date,
            fk_subProduct: subProduct.id,
            fk_family: body.fk_family,
            fk_type: body.fk_type,
            fk_provisioner: body.fk_provisioner,
          });
        })
        .then((product) => {
          return Stock.create({
            fk_product: product.id,
            quantity: body['tb_stock.quantity'],
            unity: body['tb_stock.unity']
          });
        })
        .then((stock) => res.status(201).json({msg: 'Created'}))
        .catch((error) => res.status(400).json({msg: error.message}));
      }

      async read(req, res){ 
          model.findAll({
              where: {},
              raw: true,
              attributes: ['id','name' , 'purchase_price', 'price', 'manufacturing_date',
                'expiry_date', 'fk_subProduct', 'fk_family', 'fk_type', 'fk_provisioner'],
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
          })
          .then((data)=>{
              if (data.length != 0) res.status(200).json(data)
              else res.status(204).json({mgs: 'Empty'})
          })
          .catch((error) => res.status(200).json({msg: error.message}))
      }

      async filter(req, res){
          const params = req.params.params
    
          await model.findOne({
            where: {
              id: params,
            },
            raw: true , 
            attributes: ['id','name' , 'purchase_price', 'price', 'manufacturing_date',
                'expiry_date', 'fk_subProduct', 'fk_family', 'fk_type', 'fk_provisioner'],
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
          })
          .then((data)=> {
            if (data.length != 0) res.status(200).json(data)
            else res.status(204).json({msg: 'Empty'})
          })
          .catch((error) => res.status(400).json({msg: error.message}))
      }
    
      async update(req, res){
        try {
          const body = req.body;
          const params = req.params;
      
          // Atualiza o produto
          const product = await model.findOne({
            where: { id: params.params }
          });
      
          if (product) {
            product.name = body.name
            product.purchase_price = body.purchase_price
            product.price = body.price
            product.manufacturing_date = body.manufacturing_date,
            product.expiry_date = body.expiry_date,
            product.fk_family = body.fk_family
            product.fk_provisioner = body.fk_provisioner
            product.fk_type = body.fk_type
  
            await product.save();
          } else {
            return res.status(404).json({ msg: 'Produto não encontrado!' });
          }
      
          // Atualiza o sub-produto
          const subProduct = await SubProduct.findOne({
            where: { id: body.fk_subProduct },
          });
      
          if (subProduct) {
            subProduct.description = body['tb_subProduct.description']
  
            await subProduct.save();
          } else {
            return res.status(404).json({ msg: 'Sub-produto não encontrado!' });
          }
  
          // Atualiza o stock
          const stockData = await Stock.findOne({
            where: { fk_product: body.id },
          });
      
          if (stockData) {
            stockData.quantity = body['tb_stock.quantity']
            stockData.unity = body['tb_stock.unity']
  
            await stockData.save();
          } else {
            return res.status(404).json({ msg: 'Stock não encontrado!' });
          }

          // Retorna sucesso
          return res.status(201).json({ msg: 'Produto atualizado com sucesso!' });
      
        } catch (error) {
          // Trata erros
          return res.status(400).json({ msg: error.message });
        }
      }
      
      delete(req, res){ super.delete(req, res, model) }
    }

    return new Product()
}