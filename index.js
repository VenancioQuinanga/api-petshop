const express = require('express')
const consign = require('consign')
const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
})

consign()
    .include('./boot.js')
    .then('./src/configs')
    .then('./src/middlewares')
    .then('./src/database')
    .then('./src/models/ano_economico.js')
    .then('./src/models/genero_usuario.js')
    .then('./src/models/telefone.js')
    .then('./src/models/endereco.js')
    .then('./src/models/armazem.js')
    .then('./src/models/fornecedor_produto.js')
    .then('./src/models/categoria_usuario.js')
    .then('./src/models/familia_produto.js')
    .then('./src/models/tipo_produto.js')
    .then('./src/models/tipo_pagamento.js')
    .then('./src/models/usuario.js')
    .then('./src/models/cliente.js')
    .then('./src/models/venda.js')
    .then('./src/models/fatura.js')
    .then('./src/models/historico.js')
    .then('./src/models/historico_venda.js')
    .then('./src/models/sub_produtos.js')
    .then('./src/models/produtos.js')
    .then('./src/models/estoque_produto.js')
    .then('./src/models/venda_produto.js')
    .then('./src/models/movimento.js')
    .then('./src/models/login_historico.js')
    .then('./src/models/tipo_acerto.js')
    .then('./src/models/inventario.js')
    .then('./src/models/inventario_produtos.js')
    .then('./src/global')
    .then('./src/controllers')
    .then('./src/routes')
    .into(app)
