module.exports = app => {
    const controller = app.src.controllers.Categoria_usuario_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/categoria_usuario', validate_token, controller.create)

    app.get('/categoria_usuario', validate_token, controller.read)
    
    app.patch('/categoria_usuario/:params', validate_token, controller.update)

    app.delete('/categoria_usuario/:params', validate_token, controller.delete)

}
