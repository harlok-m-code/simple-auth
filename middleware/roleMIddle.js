const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }
    
        try {
            
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(405).json({message:"Пользователь не авторизован"})
    
            }
            const {roles: userROles} = jwt.verify(token, secret)
            next()
        } catch (error) {
            res.status(405).json({message:"Пользователь не авторизован"})
        }
    }
}