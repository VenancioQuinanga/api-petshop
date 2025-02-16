module.exports = app => {
  const model = app.src.models.fatura
  const Crud = app.src.global.Crud
  const Sale = app.src.models.venda
  const Client = app.src.models.cliente
  const users = app.src.models.usuario
  const Telephone = app.src.models.telefone
  const Gender = app.src.models.genero_usuario
  const Address = app.src.models.endereco
  const Payment_type = app.src.models.tipo_pagamento

  class Invoice extends Crud{
    create(req, res){ super.create(req, res, model) }

    delete(req, res){ super.delete(req, res, model) }

    async read(req, res) {
      model.findAll({
        where: {},
        raw: true , 
        attributes: ['id', 'code', 'fk_sale'],
        include: [
          {model: Sale, attributes: ['id','fk_payment_type', 'payment','troco','date'],
            include: [
              {
                model: Client, 
                  attributes: ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
                  include: [
                    {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                    {model: Telephone, attributes: ['telephone']}, 
                    {model: Gender, attributes: ['gender']}
                  ]
                },
                {
                  model: users, 
                    attributes: ['id', 'name', 'email', 'birth_date', 'fk_telephone', 'fk_address', 'fk_gender'],
                    include: [
                      {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                      {model: Telephone, attributes: ['telephone']},
                      {model: Gender, attributes: ['gender']}
                    ]
                },
                { model: Payment_type, attributes: ['type'] }
            ]
          }
        ]
      })
      .then((data)=> { 
        if (data.length !== 0) res.status(200).json(data)
        else res.status(204).json({msg: 'Empty'}) 
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }
    
    async filter(req, res){
      const params = req.params.params

      await model.findOne({
        where: {
          fk_sale: params,
        },
        raw: true , 
        attributes: ['id', 'code', 'fk_sale'],
        include: [
          {model: Sale, attributes: ['id','fk_payment_type', 'payment','troco','date'],
            include: [
              {
                model: Client, 
                  attributes: ['id', 'name', 'email', 'nif', 'fk_telephone', 'fk_address', 'fk_gender'],
                  include: [
                    {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                    {model: Telephone, attributes: ['telephone']}, 
                    {model: Gender, attributes: ['gender']}
                  ]
                },
                {
                  model: users, 
                    attributes: ['id', 'name', 'email', 'birth_date', 'fk_telephone', 'fk_address', 'fk_gender'],
                    include: [
                      {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                      {model: Telephone, attributes: ['telephone']}, 
                      {model: Gender, attributes: ['gender']}
                    ]
                },
                { model: Payment_type, attributes: ['type'] }
            ]
          }
        ]
      })
      .then((data)=> {
        if (!data) res.status(404).json({msg: 'Not found'}) 
        else res.status(200).json(data)
      })
      .catch((error) => res.status(400).json({msg: error.message}))
    }
    
    update(req, res){ super.update(req, res, model) }
        
    delete(req, res){ super.delete(req, res, model) }
  }

  return new Invoice()
}
