module.exports = app =>{
    const controller = app.src.controllers.Tipo_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/tipo', validate_token, controller.create)

    app.get('/tipo', validate_token, controller.read)
    
    app.patch('/tipo/:id', validate_token, controller.update)
    
    app.delete('/tipo/:params', validate_token, controller.delete)
    
}
