const nodemailer = require('express')

const sendEmail = async (options)=>{
    const tansporter = await nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = await {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }
    await transpotet.sendMail(mailOptions, (err, info)=>{
        if(err) {
            console.log(err)
        }else {
            console.log(info)
        }
    })
}
module.exports = sendEmail