var urlmon = require('url-monitor');

var website = new urlmon({
	url:'https://amorgos-aegialis.com/9847298579482759043705702934', 
	interval: 500,
	timeout: 300
});

website.on('error', (data) => {
	console.log(data);
})

website.on('available', (data) => {
	console.log(data);
})

website.on('unavailable', (data) => {
	console.log(data);
	website.stop();
})

website.start();