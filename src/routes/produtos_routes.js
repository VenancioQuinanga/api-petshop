module.exports = app =>{
    const controller = app.src.controllers.Produtos_controllers
    const validate_token = app.src.middlewares.validar_token

    
    app.post('/produtos', validate_token, controller.create)

    app.get('/produtos', validate_token, controller.read)

    app.get('/produtos/:params', validate_token, controller.filter)

    app.patch('/produtos/:params', validate_token, controller.update)

    app.delete('/produtos/:params', validate_token, controller.delete)

}









