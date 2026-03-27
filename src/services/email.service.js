const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
}; 
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

// // --- INTERVIEW BYPASS: Commented out the verify block so the server starts cleanly ---
// /*
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });
// */

// // Function to send email
// const sendEmail = async (to, subject, text, html) => {
//   try {
//     // --- INTERVIEW BYPASS: Simulate email sending in the terminal ---
//     console.log(`[SIMULATED EMAIL] Sent to: ${to} | Subject: ${subject}`);
//     return; // This stops the function here, bypassing Google's servers entirely.

//     // Original code (currently ignored because of the return above)
//     const info = await transporter.sendMail({
//       from: `"Backend-ledger" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// ... keep your sendRegistrationEmail, sendTransactionEmail, etc. exactly as they are below!
async function sendRegistrationEmail(userEmail, name){
  const subject = 'Welcome to Backend-ledger!';
  const text = `Hi ${name},\n\nThank you for registering at Backend-ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend-ledger Team`;
  const html = `<p>Hi ${name},</p><p>Thank you for registering at Backend-ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend-ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount){
  const subject="Transaction Successful!"
  const text= `Hello ${name}, \n\nYour transaction of $${amount} to account ${toAccount} was successful. \n\nBest regards, \n The Backend Ledger Team`;
  const html=`<p> Hello ${name}, </p><p>Your transaction of $${amount} to account ${toAccount} was successful. </p><p>Best regards, <br> The Backend Ledger Team</p>`

  await sendEmail(userEmail, subject, text, html);
}


async function sendTransactionFailureEmail(userEmail, name, amount, toAccount){
  const subject="Transaction Failed"
  const text= `Hello ${name}, \n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} was failed. \n\nThe Backend Ledger Team`;
  const html= `<p>Hello ${name}, </p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} was failed. </p><p>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);

}

module.exports = { 
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};