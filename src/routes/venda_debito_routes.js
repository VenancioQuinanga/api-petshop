module.exports = app =>{
    const sales_debit = app.src.controllers.Venda_debito_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/venda_debito', validate_token, sales_debit.create)

    app.get('/venda_debito/:params', validate_token, sales_debit.filter)

    app.get('/venda_debito', validate_token, sales_debit.read_sales)
        
    app.patch('/venda_debito/:params', validate_token, sales_debit.update)

    app.delete('/venda_debito/:params', validate_token, sales_debit.delete)

}
