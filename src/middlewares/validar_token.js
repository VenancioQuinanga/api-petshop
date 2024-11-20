const jwt = require('jsonwebtoken')

module.exports = app =>{
    const jwt_secret_key = app.src.configs.webtoken

    function validate_token(req, res, next){
        const req_token = req.headers['authorization']

        if(req_token){ 
            const token = req_token.split(' ')[1]
            jwt.verify(token, jwt_secret_key, (error, data)=>{
                if(error) res.status(401).json({msg: 'Invalid Token...!'})
                else {
                    req.token = token
                    req.user = {id: data.id, email: data.email}
                    next()
                }
            })
        }
        else res.status(401).json({msg: 'Invalid token...!'})
        
    }

    return validate_token
}