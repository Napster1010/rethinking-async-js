function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return new Promise(function(resolve, reject) {
		fakeAjax(file, resolve);
	});
}

var prom1 = getFile("file1");
var prom2 = getFile("file2");
var prom3 = getFile("file3");


prom1
.then(function(text1) {
	output(text1);
	return prom2;
})
.then(function(text2) {
	output(text2);
	return prom3;
})
.then(function(text3) {
	output(text3);
	output("Complete!");
});


