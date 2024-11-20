module.exports = app =>{
    const controller = app.src.controllers.Familia_controllers
    const validate_token = app.src.middlewares.validar_token

    
    app.post('/familia', validate_token, controller.create)

    app.get('/familia', validate_token, controller.read)

    app.patch('/familia/:params', validate_token, controller.update)

    app.delete('/familia/:params', validate_token, controller.delete)

}