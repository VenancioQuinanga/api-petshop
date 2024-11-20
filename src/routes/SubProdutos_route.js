module.exports = app => {
    const controller = app.src.controllers.SubProdutos_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/sub_produtos', validate_token, controller.create)

    app.get('/sub_produtos', validate_token, controller.read)
    
    app.patch('/sub_produtos/:params', validate_token, controller.update)

    app.delete('/sub_produtos/:params', validate_token, controller.delete)

}
