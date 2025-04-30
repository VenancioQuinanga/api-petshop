module.exports = app =>{
    const Sales_proforma = app.src.controllers.Venda_proforma_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/venda_proforma', validate_token, Sales_proforma.create)

    app.get('/venda_proforma/:params', validate_token, Sales_proforma.filter)

    app.get('/venda_proforma', validate_token, Sales_proforma.read_sales)
        
    app.patch('/venda_proforma/:params', validate_token, Sales_proforma.update)

    app.delete('/venda_proforma/:params', validate_token, Sales_proforma.delete)

}
