module.exports = app => {
    const controller = app.src.controllers.Genero_usuario_controllers
    const validate_token = app.src.middlewares.validar_token


    app.post('/genero_usuario', validate_token, controller.create)
    
    app.get('/genero_usuario', validate_token, controller.read)

    app.patch('/genero_usuario/:params', validate_token, controller.update)

    app.delete('/genero_usuario/:params', validate_token, controller.delete)
    
}