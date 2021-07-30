const Router = require('express')
const router = Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddle = require('./middleware/authMiddle')
const roleMiddle = require('./middleware/roleMIddle')

router.post('/registration',[
    check('username',"Имя пользователя не может быть пустым").notEmpty(),
    check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4, max:10})
],controller.registration)
router.post('/login',controller.login)
router.get('/users',roleMiddle(),controller.getUsers)

module.exports = router