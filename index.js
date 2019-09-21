const cron = require('node-cron');
const nodemailer = require('nodemailer');

// cron jobs
const task = cron.schedule('01 12 * * *', function() {
  sendEmail().then(console.log('success send email'));
});

// send email
async function sendEmail() {
  let transaction, income, configMail, transporter, emailTarget, mail;

  transaction = Math.floor(Math.random() * 10) + 1;

  income = `Rp ${transaction * 10000},00`;

  configMail = {
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  };

  transporter = await nodemailer.createTransport(configMail);
  emailTarget = 'youremailtarget@gmail.com';

  mail = {
    to: emailTarget,
    from: configMail.auth.user,
    subject: '[Daily Report] - Transaction & Total Income',
    html: `This is your Daily report. Total <b>success Transaction : ${transaction} </b>   and Total <b>Income : ${income} </b>`
  };
  transporter.sendMail(mail);
}

task.start();