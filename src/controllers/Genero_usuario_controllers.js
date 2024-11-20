module.exports = app => {
    const Crud = app.src.global.Crud
    const Model = app.src.models.genero_usuario

    class Gender extends Crud{
        create(req, res){ super.create(req, res, Model) }

        read(req, res){ super.read(req, res, Model) }

        update(req, res){ super.update(req, res, Model) }

        delete(req, res){ super.delete(req, res, Model) }

    }

    return new Gender()
}