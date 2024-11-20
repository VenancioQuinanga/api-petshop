const jwt = require('jsonwebtoken')

module.exports = app =>{
    const jwt_secret_key = app.src.configs.webtoken

    async function generate_token(req, res, id, email){

        await jwt.sign(
            {id: id, email: email}, 
            jwt_secret_key, 
            {expiresIn: '24h'},
            (error, token) =>  {
                if (error) res.status(400).json({msg: 'Generate token failed...!'})
                else res.status(200).json({msg:'Authentication has success' , id: id, token: token})
            }
        )

    }

    return generate_token
    
}