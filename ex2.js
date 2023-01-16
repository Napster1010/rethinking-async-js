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
	var fileText;
	var thCbCopy;
	fakeAjax(file, function cb(response) {
		fileText = response;
		if (thCbCopy) {
			thCbCopy(response);
		}
	});
	return function fileThunk(thCb) {
		if (fileText) {
			thCb(fileText);
		} else {
			thCbCopy = thCb;
		}
	};
}

var fileTh1 = getFile("file1");
var fileTh2 = getFile("file2");
var fileTh3 = getFile("file3");

fileTh1(function cb1(resp1) {
	output(resp1);
	fileTh2(function cb2(resp2) {
		output(resp2);
		fileTh3(function cb3(resp3) {
			output(resp3);
			output("Complete!");
		});
	});
});
