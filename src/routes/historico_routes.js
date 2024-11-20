module.exports = app =>{
    const controller = app.src.controllers.Historico_controllers
    const validate_token = app.src.middlewares.validar_token
    
    app.post('/historico', validate_token, controller.create)

    app.get('/historico', controller.read)

    app.get('/historico/:params', validate_token, controller.filter)

    app.patch('/historico/:params', validate_token, controller.update)

    app.delete('/historico/:params', validate_token, controller.delete)

}
