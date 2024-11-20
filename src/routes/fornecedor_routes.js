module.exports = app =>{
    const controller = app.src.controllers.Fornecedor_controllers
    const validate_token = app.src.middlewares.validar_token


    app.post('/fornecedor', validate_token, controller.create)

    app.get('/fornecedor', validate_token, controller.read)
    
    app.get('/fornecedor/:params', validate_token, controller.filter)
        
    app.patch('/fornecedor/:params', validate_token, controller.update)

    app.delete('/fornecedor/:params', validate_token, controller.delete)
        
}