module.exports = app =>{
    class Crud{
        async create(req, res, model){
            model.create(req.body)
                .then((data)=> res.status(201).json({data: data, msg: 'Created! '}))
                .catch((error) => res.status(400).json({msg: error.message}))
        }

        async read(req, res, model){
            model.findAll({raw: true})
                .then((data)=> {
                    if (data.length != 0) res.status(200).json(data)
                    else res.status(204).json({msg: 'Empty'})
                })
                .catch((error) => res.status(400).json({msg: error.message}))
        }

        async update(req, res, model){
            model.update(req.body, { where:{ id: req.params.id } })
                .then((data) => res.status(200).json({msg: 'Updated'}))
                .catch((error) => res.status(404).json({msg: error.message}))
        }

        async delete(req, res, model){
            const params = req.params.params
            
            model.destroy({where: {id: params}})
                .then(()=> res.status(200).json({msg: 'Deleted!'}))
                .catch((error)=> res.status(400).json({msg: error.message}))
        }
    }

    return Crud
}