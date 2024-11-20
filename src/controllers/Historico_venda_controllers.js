module.exports = app =>{
    const model = app.src.models.historico_venda
    const Crud = app.src.global.Crud
    const Client = app.src.models.cliente
    const Sale = app.src.models.venda
    const history = app.src.models.historico
    const users = app.src.models.usuario
    const Telephone = app.src.models.telefone
    const Gender = app.src.models.genero_usuario
    const Category = app.src.models.categoria_usuario
    const Payment_type = app.src.models.tipo_pagamento
    const Address = app.src.models.endereco  

    class Sale_history extends Crud{
        create(req, res){ super.create(req, res, model) }

        async read(req, res) {
            model.findAll({
              where: {},
              raw: true , 
              attributes: ['id', 'fk_history', 'fk_sale'],
              include: [
                {model: history, attributes: ['id','start_date', 'end_date']},
                {model: Sale, attributes: ['id','fk_payment_type', 'payment','troco','date'],
                  include: [
                    {
                      model: Client, 
                        attributes: ['id', 'name', 'email', 'fk_telephone', 'fk_address', 'fk_gender'],
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
                              {model: Category, attributes: ['category']},
                              {model: Gender, attributes: ['gender']}
                          ]
                      },
                  ]
                }
              ]
        })
        .then((data)=> {
            if (data.length != 0) res.status(200).json(data)
            else res.status(204).json({msg: 'Empty'})
        })
        .catch((error) => res.status(400).json({msg: error.message}))
        }

        async filter(req, res) {
          let params = req.params
          model.findAll({
            where: {
              fk_history: params.params
            },
            attributes: ['id', 'fk_history', 'fk_sale'],
            include: [
              {model: history, attributes: ['id', 'start_date', 'end_date']},
              {model: Sale, attributes: ['id', 'fk_payment_type', 'payment', 'troco', 'date'],
              include: [
                {
                  model: Client, 
                    attributes: ['id', 'name', 'email', 'fk_telephone', 'fk_address', 'fk_gender'],
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
                        {model: Category, attributes: ['category']},
                        {model: Gender, attributes: ['gender']}
                      ]
                    },
                ]
              }
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

    return new Sale_history()
}