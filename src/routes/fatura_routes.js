module.exports = app =>{
    const controller = app.src.controllers.Fatura_controllers
    const validate_token = app.src.middlewares.validar_token
    
    app.post('/fatura', validate_token, controller.create)

    app.get('/fatura', validate_token, controller.read)

    app.get('/fatura/:params', validate_token, controller.filter)

    app.get('/fatura/proforma/:params', validate_token, controller.filter_proform)

    app.get('/fatura/credito/:params', validate_token, controller.filter_credit)

    app.get('/fatura/debito/:params', validate_token, controller.filter_debit)

    app.patch('/fatura/:params', validate_token, controller.update)

    app.delete('/fatura/:params', validate_token, controller.delete)

}
