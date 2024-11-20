module.exports = app =>{
    const model = app.src.models.endereco
    const Crud = app.src.global.Crud

    class Invoice extends Crud{
        create(req, res){ super.create(req, res, model) }

        read(req, res){ super.read(req, res, model) }

        update(req, res){ super.update(req, res, model) }
        
        delete(req, res){ super.delete(req, res, model) }

    }

    return new Invoice()
}