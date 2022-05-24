const express = require('express')
const router = express.Router()
const { register, login, forgetPassword, resetPassword } = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgetpass').post(forgetPassword)
router.route('/resetpass/:resetToken').put(resetPassword)


module.exports = router