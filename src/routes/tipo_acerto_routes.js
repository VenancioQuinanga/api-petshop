module.exports = app => {
    const controller = app.src.controllers.Tipo_acerto_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/tipo_acerto', validate_token, controller.create)

    app.get('/tipo_acerto', validate_token, controller.read)
    
    app.patch('/tipo_acerto/:params', validate_token, controller.update)

    app.delete('/tipo_acerto/:params', validate_token, controller.delete)

}
