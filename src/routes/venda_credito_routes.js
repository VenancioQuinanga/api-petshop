module.exports = app =>{
    const Sales_credit = app.src.controllers.Venda_credito_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/venda_credito', validate_token, Sales_credit.create)

    app.get('/venda_credito/:params', validate_token, Sales_credit.filter)

    app.get('/venda_credito', validate_token, Sales_credit.read_sales)
        
    app.patch('/venda_credito/:params', validate_token, Sales_credit.update)

    app.delete('/venda_credito/:params', validate_token, Sales_credit.delete)

}
