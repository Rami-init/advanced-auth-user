const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const crypto = require('crypto')
exports.register = async(req, res, next)=>{
    const {username, email, password} = req.body
    try {
        const user = await User.create({
            username,
            email,
            password
        });
        sendToken(user, 201, res)
    } catch (error) {
       next(error)
    }
}
exports.login = async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password) {
        return next(new ErrorResponse('Please Provide the Email and Password', 404))
    }
    try {
        const user = await User.findOne({email}).select("+password")
        if (user) {
            const isMatch = await user.matchPasswords(password)
            if(isMatch) {
               sendToken(user, 200, res)      
            } else {
                return next(new ErrorResponse('invalid credentials email and password', 401))
            }
        } else {
            return next(new ErrorResponse('invalid credentials email and password', 401))
        }
    } catch (error) {
       next(error)
    }

}
exports.forgetPassword = async(req, res, next) =>{
    const {email} = req.body
    try {
        if(!email) {
            next(new ErrorResponse('Email could not be sent', 404))
        }
        const user =await User.findOne({email})
        if(!user){
            next(new ErrorResponse('Email could not be sent', 404))
        }
        const resetToken = await user.getResetPasswordToken()
        await user.save()
        const resetUrl = `/resetpass/${resetToken}`
        const message = `
            <h2>you have request to set your password ?</h2>
            <p>please go to link below to reset the password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            const sendEmail = {
                to: user.email,
                subject: 'password Reset Request',
                text: message
            }
            res.status(200).json({
                success: true, 
                data: 'the reset password is been sent',
                resetUrl
            })

        }catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()
            return next(new ErrorResponse('the mail could be sent'))
        }
        
    } catch(error) {
        next(error)
    }
}
exports.resetPassword = async(req, res, next) =>{
    const resetPasswordToken = await crypto.createHash('sha256')
    .update(req.params.resetToken).digest('hex')
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })
        if(!user) {
            return next(new ErrorResponse("invalid Reset Token", 400))
        }
        user.password = await req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        res.status(201).json({
            success: true,
            data: 'the password changed'
        })
    }catch (error) {
        next(error)
    }
}
const sendToken = async (user, statusCode, res)=>{
    const token = await user.getSignToken()
    console.log(token)
    res.status(statusCode).json({
        success: true,
        token
    })
}