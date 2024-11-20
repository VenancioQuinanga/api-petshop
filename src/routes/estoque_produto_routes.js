module.exports = app =>{
    const controller = app.src.controllers.Estoque_produto_controllers
    const validate_token = app.src.middlewares.validar_token

    
    app.get('/estoque', validate_token, controller.read)

    app.post('/estoque', validate_token, controller.create)

    app.patch('/estoque/:id', validate_token, controller.update)

    app.delete('/estoque/:params', validate_token, controller.delete)

}

