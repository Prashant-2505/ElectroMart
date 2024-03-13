import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sharmaprashant2505@gmail.com', // Replace with your email address
        pass: 'Prashant@8447' // Replace with your email password
    }
});
