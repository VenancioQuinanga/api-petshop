module.exports = app =>{
    const controller = app.src.controllers.Usuarios_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/usuario/authenticate', controller.authenticate)

    app.get('/usuario/get_photo/:photo', controller.getPhoto)
    
    app.post('/usuario', validate_token, controller.create)

    app.get('/usuario', controller.read)

    app.get('/usuario/getuserbytoken/:token', controller.getUserByToken); 

    app.get('/usuario/:params', validate_token, controller.filter)

    app.patch('/usuario/:params',validate_token, controller.update)

    app.delete('/usuario/:params',validate_token, controller.delete)

}
