import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';

export const sendEmail = asyncHandler(async (req, res) => {
  const user = process.env.CONTACT_USER;
  const password = process.env.CONTACT_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  const { firstName, secondName, email, phoneNumber, subject, message } =
    req.body;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: user, // sender address
    to: email, // list of receivers
    subject: `${firstName} ${secondName} - ${subject}`, // Subject line
    html: `<div><p>${firstName} ${secondName}</p><p>Email: ${email}</p><p>Phone number: ${phoneNumber}</p><br/><p>${message}</p></div>`, // html body
  });

  res.send(info);
});
