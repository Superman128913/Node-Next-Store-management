/**
 * Created by trungquandev.com's author on 18/02/2020.
 * utils/mailer.js
 */
require("dotenv").config();
const nodeMailer = require('nodemailer')

const adminEmail = process.env.MAIL_AUTH_EMAIL
const adminUser = process.env.MAIL_AUTH_USER
const adminPassword = process.env.MAIL_AUTH_PASSWORD
const mailHost = process.env.MAIL_HOST
const mailPort = process.env.MAIL_PORT

const auth = { user: adminUser, pass: adminPassword }

const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    auth: auth
  })

  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent
  }

  return transporter.sendMail(options)
}

module.exports = {
  sendMail: sendMail
}
