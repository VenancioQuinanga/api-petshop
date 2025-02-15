const jwt = require('jsonwebtoken')

module.exports = app =>{
    const jwt_secret_key = app.src.configs.webtoken

    async function generate_token(req, res, id, email, is_admin){

        await jwt.sign(
            {id: id, email: email, is_admin: is_admin}, 
            jwt_secret_key, 
            {expiresIn: '24h'},
            (error, token) =>  {
                if (error) res.status(400).json({msg: 'Generate token failed...!'})
                else res.status(200).json({msg:'Authentication has success' , id: id, token: token, is_admin: is_admin})
            }
        )

    }

    return generate_token
    
}