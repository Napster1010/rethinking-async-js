var correctFileOrder = {
	"file1": 0,
	"file2": 1,
	"file3": 2
};
var responses = [undefined, undefined, undefined];
var printed = [false, false, false];

function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	
	// var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
	var randomDelay;
	switch(url) {
		case "file1":
			randomDelay = 3000;
			break;
		case "file2":
			randomDelay = 1000;
			break;
		case "file3":
			randomDelay = 6000;
			break;
	}

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		processResponse(file, text);				
	});
}

function processResponse(file, text) {
	if (shouldPrintCurrentResponse(file)) {
		var keepPrinting = true;
		var curIndex = correctFileOrder[file];
		responses[curIndex] = text;
		while(responses[curIndex] && !printed[curIndex]) {
			output(responses[curIndex]);
			printed[curIndex] = true;
			++curIndex;
		}
	} else {
		responses[correctFileOrder[file]] = text;
	}
}

function shouldPrintCurrentResponse(file) {
	for(var i=0; i<correctFileOrder[file]; i++) {
		if (!printed[i]) {
			return false;
		}
	}
	return true;
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
