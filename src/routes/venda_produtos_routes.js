module.exports = app =>{
    const sales_product = app.src.controllers.Venda_produtos_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/venda_produto', validate_token, sales_product.create)

    app.get('/venda_produto/:params', validate_token, sales_product.filter)

    app.get('/venda_produto', validate_token, sales_product.read_sales)
        
    app.patch('/venda_produto/:params', validate_token, sales_product.update)

    app.delete('/venda_produto/:params', validate_token, sales_product.delete)

}
