const urlmon = require('url-monitor');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const https = require('https');

dotenv.config({
  path: './config.env'
});

let state,timestamp,timestampNow
//nodemail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated user
    pass: process.env.EMAIL_PASS // generated password
  }
});

const mailerlist = process.env.EMAIL_LIST



const website = new urlmon({
  url: process.env.URL,
  interval: 300000, // in ms
  timeout: 2000
});

// 50x
website.on('error', (data) => {
  if (state === 1) {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mailerlist,
      subject: `The server for ${data.url} is down`,
      text: `
      It seems the server for the url:
      ${data.url}
      is down`
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    const webhookdata = JSON.stringify({
      "activity": `Uptime Bot`,
      "title": `Server is down`,
      "icon": "",
      "body": `500 error for ${data.url}`
    })

    const options = {
      hostname: process.env.WEBH.HOST,
      port: 443,
      path: process.env.WEBH.PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': webhookdata.length
      }
    }

    const req = https.request(options, res => {
      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.write(webhookdata)
    req.end()
  }
  state = 0
})

// 200
website.on('available', (data) => {
  if (state === 0) {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mailerlist,
      subject: `200 OK for ${data.url}`,
      text: `It seems the url:
      ${data.url}
      is now online!`
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    const webhookdata = JSON.stringify({
      "activity": `Uptime Bot`,
      "title": `Website is online`,
      "icon": "https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png",
      "body": `200 OK for ${data.url}`
    })

    const options = {
      hostname: process.env.WEBH.HOST,
      port: 443,
      path: process.env.WEBH.PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': webhookdata.length
      }
    }

    const req = https.request(options, res => {
      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.write(webhookdata)
    req.end()
  }
  state = 1
})

// 404
website.on('unavailable', (data) => {
  if (state === 1) {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mailerlist,
      subject: `404 for ${data.url}`,
      text: `It seems the url:
      ${data.url}
      has a 404 status`
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    const webhookdata = JSON.stringify({
      "activity": `Uptime Bot`,
      "title": `Website is down`,
      "icon": "",
      "body": `404 not found for ${data.url}`
    })

    const options = {
      hostname: process.env.WEBH.HOST,
      port: 443,
      path: process.env.WEBH.PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': webhookdata.length
      }
    }

    const req = https.request(options, res => {
      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.write(webhookdata)
    req.end()

  }
  state = 0

})

website.start();
