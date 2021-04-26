const urlmon = require('url-monitor');
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });


//nodemail
var transporter = nodemailer.createTransport({
 host: process.env.EMAIL_HOST,
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS  // generated ethereal password
        }
    });

var mailOptions = {
  from: EMAIL_USER,
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


const website = new urlmon({
	url:'https://amorgos-aegialis.com/9847298579482759043705702934', 
	interval: 5000,
	timeout: 3000
});

website.on('error', (data) => {
    //website.stop();
	console.log(data);
})

website.on('available', (data) => {
	console.log(data);
})

website.on('unavailable', (data) => {
	console.log(data);
	//website.stop();
})

website.start();