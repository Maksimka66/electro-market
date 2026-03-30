import nodemailer from 'nodemailer'

export async function sendActivationEmailService(to, link) {
    const emailObj = {
        transporter: nodemailer.createTransport({
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    await emailObj.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Please activate your account on ${process.env.API_URL}`,
        text: '',
        html: `<div>
                    <p>Please follow this link to activate your account:</p>
                    <a href=${link}>${link}</a>
                </div>`
    })
}

