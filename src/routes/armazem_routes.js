module.exports = app =>{
    const controller = app.src.controllers.Armazem_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/armazem', validate_token, controller.create)

    app.get('/armazem', validate_token, controller.read)
    
    app.patch('/armazem/:id', validate_token, controller.update)
    
    app.delete('/armazem/:params', validate_token, controller.delete)
    
}
