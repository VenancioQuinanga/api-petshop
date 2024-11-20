module.exports = app =>{
    const model = app.src.models.login_historico
    const Crud = app.src.global.Crud
    const Users = app.src.models.usuario
    const Address = app.src.models.endereco
    const Telephone = app.src.models.telefone
    const Gender = app.src.models.genero_usuario
    const Category = app.src.models.categoria_usuario

    class Logged_histories extends Crud{
        create(req, res){ super.create(req, res, model) }

        async read(req, res){ 
            model.findAll({
                attributes: ['id', 'fk_user', 'date'],
                include: [
                    {
                        model: Users, attributes: ['id', 'name', 'email', 'birth_date',
                         'fk_telephone', 'fk_address', 'fk_gender', 'fk_category'],
                        include: [
                            {model: Address, attributes: ['neighborhood', 'street', 'house']}, 
                            {model: Telephone, attributes: ['telephone']}, 
                            {model: Gender, attributes: ['gender']}, 
                            {model: Category, attributes: ['category']}
                        ]
                    }, 
                ],
                raw: true
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

    return new Logged_histories()
}