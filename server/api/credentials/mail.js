const nodemailer = require('nodemailer');
const credentials = require('./credentials.js');

exports.verify = async function mailing(email,token){
  // create reusable transporter object using the default SMTP transport
  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: credentials.gmail.user, // generated ethereal user
      pass: credentials.gmail.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "吃早餐交朋友", // sender address
    to: email, // list of receivers
    subject: "歡迎加入吃早餐交朋友", // Subject line
    html: "<b>嗨！我是早餐小兔，</b>"+
          "<p>使用以下連結，驗證個人身份喔！</p>"+
          "<a href='http://localhost:8888/email?token="+token+"'>前往驗證！</a>" // html body
  });

}
