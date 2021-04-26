const urlmon = require('url-monitor');
const nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
 host: "smtp.example.com",
  port: 587,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "username",
    pass: "password"
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
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
    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})

website.on('available', (data) => {
	console.log(data);
})

website.on('unavailable', (data) => {
	console.log(data);
	//website.stop();
})

website.start();