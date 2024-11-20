module.exports = app =>{
    const controller = app.src.controllers.Ano_economico_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/ano_economico', validate_token, controller.create)

    app.get('/ano_economico', validate_token, controller.read)
    
    app.patch('/ano_economico/:id', validate_token, controller.update)
    
    app.delete('/ano_economico/:params', validate_token, controller.delete)
    
}
