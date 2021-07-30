const User = require('./models/Users')
const Role = require('./models/Role')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config')


const generateAccesToken = (id,roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,secret, {expiresIn:"24h"})
}

class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({message:"Ошибка при регистрации",errors})
            }

            const {username, password} = req.body
            const cand = await User.findOne({username})
            if(cand){
                res.status(400).json({message:"ДАнный Пользователь уже заригестрирован"})
            }
            const hashPassword = bcryptjs.hashSync(password, 6)
            const userRole = await Role.findOne({value:"USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            
            await user.save()
            return res.status(200).json({message:"Пользователь cоздан!"})
            
        } catch (error) {
            console.log(error)  
        }
    }

    async login (req, res) {
        try {
            const {username,password} = req.body
            const user = await User.findOne({username})

            if(!user){
                res.status(400).json({message:`ДАнный пользователь ${username} не найден`})
            }
            const valPassword = bcryptjs.compareSync(password, user.password)
            if(!valPassword){
                res.status(400).json({message:"Введен неверный пароль"})
            }
            const token = generateAccesToken(user._id, user.roles)
            return res.json({token})
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()