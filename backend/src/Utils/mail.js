import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})




const successMail = (reciever) => {
    const transporter = nodemailer.createTransport({
        secure: true,
        host: 'smtp.gmail.com',
        port: process.env.NODEMAILER_PORT,
        auth: {
            user: process.env.NODEMAILER_SENDER,
            pass: process.env.NODEMAILER_APP_PASSWORD
        }
    })


    transporter.sendMail({
        to: reciever,
        subject: 'Successfull Account Creation',
        html: '<p> Your account was created successfully. Please enjoy our website</p>'
    })
}


const OTPVerificationMail = async (reciever, OTP) => {
    try {
        const transporter = nodemailer.createTransport({
            secure: true,
            host: 'smtp.gmail.com',
            port: process.env.NODEMAILER_PORT,
            auth: {
                user: process.env.NODEMAILER_SENDER,
                pass: process.env.NODEMAILER_APP_PASSWORD
            }
        })
        const response = await transporter.sendMail({
            to: `${reciever}`,
            subject: 'OTP Verification',
            html: `<p> Your OTP is ${OTP} </p>`
        })
        return response
    } catch (error) {
        return error.code
    }
}


export { successMail, OTPVerificationMail }