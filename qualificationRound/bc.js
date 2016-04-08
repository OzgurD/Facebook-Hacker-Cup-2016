var fs = require('fs');
var math = require('mathjs');

function isAlreadyHad(list, hashValue) {
	for (var i = 0; i < list.length; i++) {
		if (list[i] == hashValue) {
			return true;
		}
	}
	return false;
}

// lengthAmoutList format: [[length, amount], ... ]
// lengthAmoutList example: [[10, 2], [14.14, 4], [20, 1]]
function handleLengthAmountList(lengthAmoutList, length) {
	for (var i = 0; i < lengthAmoutList.length; i++) {
		if (length == lengthAmoutList[i][0]) {
			lengthAmoutList[i][1] += 1;
			return lengthAmoutList;
		}
	}
	newLengthPair = [length, 1];
	lengthAmoutList.push(newLengthPair);
	return lengthAmoutList;
}

function factorial(n) {
   if ((n == 0) || (n == 1)) {
      return 1;
   }
   else {
      return (n * factorial(n-1) );
   }
}

var splitList = [];
var rawDataList = [];
var fileName = 'boomerang_constellations.txt'
var array = fs.readFileSync(fileName).toString().split("\n");
for(i in array) {
	splitList = array[i].split(' ');
	rawDataList.push(splitList);
}

var nCounter = 1;
var pointer = 1;
var T = parseInt(rawDataList[0][0]);
while (nCounter <= T) {
	n = parseInt(rawDataList[pointer][0]);
	var starList = [];
	for (var i = 0; i < n; i++) {
		point = [parseInt(rawDataList[pointer + 1 + i][0]), parseInt(rawDataList[pointer + 1 + i][1])];
		starList.push(point);
	}
	var caseList = []
	var caseCount = 0;
	var starOtherDistanceTable = [];
	for (var i = 0; i < starList.length; i++) {
		var lengthAmoutList = [];
		for (var j = 0; j < starList.length; j++) {
			if (i != j) {
				lengthAmoutList = handleLengthAmountList(lengthAmoutList, math.sqrt(math.pow(starList[i][0] - starList[j][0], 2) + math.pow(starList[i][1] - starList[j][1], 2)));
			}
		}
		for (var k = 0; k < lengthAmoutList.length; k++) {
			if (lengthAmoutList[k][1] >= 2) {
				caseCount += factorial(lengthAmoutList[k][1]) / (2 * factorial(lengthAmoutList[k][1] - 2));
			}
		}
	}
	console.log('Case #' + nCounter + ': ' + caseCount);
	nCounter += 1;
	pointer += n + 1;
}
