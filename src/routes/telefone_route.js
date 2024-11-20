module.exports = app => {
    const controller = app.src.controllers.Telefone_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/telefone', validate_token, controller.create)

    app.get('/telefone', validate_token, controller.read)
    
    app.patch('/telefone/:params', validate_token, controller.update)

    app.delete('/telefone/:params', validate_token, controller.delete)

}
