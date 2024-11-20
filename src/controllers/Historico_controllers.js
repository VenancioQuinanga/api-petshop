module.exports = app => {
  const model = app.src.models.historico
  const Crud = app.src.global.Crud
  const history_sale = app.src.models.historico_venda

  class History extends Crud{
    async create(req, res) {
      const body = req.body;
      const sales = body.sales
  
      model.create({
        start_date: body.startDate,
        end_date: body.endDate
      })
      .then((history) => {
        sales.map((sale)=>{
          history_sale.create({
            fk_history: history.id,
            fk_sale: sale.id,
          });
        })
      })
      .then((stock) => res.status(201).json({msg: 'Created'}))
      .catch((error) => res.status(400).json({msg: error.message}));
    }

    read(req, res){ super.read(req, res, model) }

    async filter(req, res) {
      let params = req.params
      model.findOne({
        where: {
          id: params.params
        },
        raw: true,
        attributes: ['id', 'start_date', 'end_date', 'date']
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

  return new History()
}
