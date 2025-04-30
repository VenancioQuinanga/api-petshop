module.exports = app =>{
    const controller = app.src.controllers.Inventario_controllers
    const validate_token = app.src.middlewares.validar_token
    
    app.post('/inventario', validate_token, controller.create)

    app.get('/inventario', validate_token, controller.read)

    app.get('/inventario/saft', controller.generate_saft)

    app.get('/inventario/:params', validate_token, controller.filter)

    app.patch('/inventario/:params', validate_token, controller.update)

    app.delete('/inventario/:params', validate_token, controller.delete)

}
