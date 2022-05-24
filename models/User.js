const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide a Username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a Email'],
        unique: true,
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , 'Please provide valid Email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a Password'],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{
    Timestamps: true
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.methods.getSignToken = async function (){
    return await jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '20d'})
}
UserSchema.methods.getResetPasswordToken = async function(){
    const resetToken = await crypto.randomBytes(35).toString('hex')
    this.resetPasswordToken = await crypto.createHash('sha256')
    .update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken
}
const User = mongoose.model('User', UserSchema)
module.exports = User