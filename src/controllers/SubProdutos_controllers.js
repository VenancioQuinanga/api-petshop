module.exports = app =>{
    const model = app.src.models.sub_produtos
    const Crud = app.src.global.Crud

    class SubProducts extends Crud{
        create(req, res){ super.create(req, res, model) }

        read(req, res){ super.read(req, res, model) }

        update(req, res){ super.update(req, res, model) }
        
        delete(req, res){ super.delete(req, res, model) }

    }

    return new SubProducts()
}