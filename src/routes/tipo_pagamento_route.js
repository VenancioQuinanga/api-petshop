module.exports = app => {
    const controller = app.src.controllers.Tipo_pagamento_controllers
    const validate_token = app.src.middlewares.validar_token

    app.post('/tipo_pagamento', validate_token, controller.create)

    app.get('/tipo_pagamento', validate_token, controller.read)
    
    app.patch('/tipo_pagamento/:params', validate_token, controller.update)

    app.delete('/tipo_pagamento/:params', validate_token, controller.delete)

}
