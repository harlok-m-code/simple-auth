const jwt = require('jsonwebtoken')
const {secret} = require('../config')
module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.status(405).json({message:"Пользователь не авторизован"})

        }
        const decode = jwt.verify(token,secret)
        req.user = decode
        next()
    } catch (error) {
        res.status(405).json({message:"Пользователь не авторизован"})
    }
}