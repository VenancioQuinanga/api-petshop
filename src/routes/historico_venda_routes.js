module.exports = app =>{
    const controller = app.src.controllers.Historico_venda_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/historico_venda', validate_token, controller.create)

    app.get('/historico_venda', validate_token, controller.read)

    app.get('/historico_venda/:params', validate_token, controller.filter)
    
    app.patch('/historico_venda/:id', validate_token, controller.update)
    
    app.delete('/historico_venda/:params', validate_token, controller.delete)
    
}
