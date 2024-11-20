module.exports = app =>{
    const controller = app.src.controllers.Clientes_controllers
    const validate_token = app.src.middlewares.validar_token
    
    app.post('/cliente', validate_token, controller.create)

    app.get('/cliente', validate_token, controller.read)    

    app.get('/cliente/:params', validate_token, controller.filter)

    app.patch('/cliente/:params', validate_token, controller.update)

    app.delete('/cliente/:params', validate_token, controller.delete)

}
