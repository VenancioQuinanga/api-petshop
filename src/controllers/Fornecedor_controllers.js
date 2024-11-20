module.exports = app =>{
    const model = app.src.models.fornecedor_produto
    const Crud = app.src.global.Crud
    const Telephone = app.src.models.telefone

    class Provisioner extends Crud{
        create(req, res){ super.create(req, res, model) }

        async read(req, res){ 
            model.findAll({
                where: {},
                raw: true , 
                attributes: ['id', 'name', 'email', 'fk_telephone'],
                include: [
                    {model: Telephone, attributes: ['telephone']},
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
                where: {},
                raw: true , 
                attributes: ['id', 'name', 'email', 'fk_telephone'],
                include: [
                    {model: Telephone, attributes: ['telephone']},
                ]
            })
            .then((data)=>{
                if (data.length != 0) res.status(200).json(data)
                else res.status(204).json({mgs: 'Empty'})
            })
            .catch((error) => res.status(200).json({msg: error.message}))
        }
            
        update(req, res){ super.update(req, res, model) }
        
        delete(req, res){ super.delete(req, res, model) }
    }

    return new Provisioner()
}