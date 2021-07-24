import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function emailSender(to, subject, text, next) {
  try {
    // create reusable transporter object using the gmail SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to,
      subject,
      text,
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export default emailSender;
