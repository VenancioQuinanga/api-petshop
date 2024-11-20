module.exports = app => {
    const controller = app.src.controllers.Endereco_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/endereco', validate_token, controller.create)

    app.get('/endereco', validate_token, controller.read)
    
    app.patch('/endereco/:params', validate_token, controller.update)

    app.delete('/endereco/:params', validate_token, controller.delete)

}
