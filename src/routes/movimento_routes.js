module.exports = app =>{
    const controller = app.src.controllers.Movimento_controllers
    const validate_token = app.src.middlewares.validar_token
    
    app.post('/movimento', validate_token, controller.create)

    app.get('/movimento', controller.read)

    app.patch('/movimento/:params', validate_token, controller.update)

    app.delete('/movimento/:params', validate_token, controller.delete)

}
