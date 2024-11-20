module.exports = app =>{
    const controller = app.src.controllers.Login_historico_controllers
    const validate_token = app.src.middlewares.validar_token

    app.get('/login_historico', validate_token, controller.read)

    app.post('/login_historico', controller.create)

    app.patch('/login_historico/:id/', validate_token, controller.update)

    app.delete('/login_historico/:params', validate_token, controller.delete)

}