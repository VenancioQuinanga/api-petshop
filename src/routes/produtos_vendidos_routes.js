module.exports = app =>{
    const sales_product = app.src.controllers.Venda_produtos_controllers
    const validate_token = app.src.middlewares.validar_token

    app.get('/produtos_vendidos', validate_token, sales_product.read)
        
}





