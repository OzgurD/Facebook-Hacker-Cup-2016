var fs = require('fs');
var math = require('mathjs');

// function findWings(distanceRecordTable) {
// 	var pairList = [];
// 	for (var k = 0; k < distanceRecordTable.length; k++) {
// 		for (var l = k + 1; l < distanceRecordTable.length; l++) {
// 			if (distanceRecordTable[k][1] == distanceRecordTable[l][1]) {
// 				pair = [distanceRecordTable[k][0], distanceRecordTable[l][0]];
// 				pairList.push(pair);
// 			}
// 		}
// 	}
// 	return pairList;
// }

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

// function getCaseAmount(starList) {
// 	var caseList = []
// 	// console.log(starList);
// 	for (var i = 0; i < starList.length; i++) {
// 		var distanceRecordTable = [];
// 		for (var j = 0; j < starList.length; j++) {
// 			if (i != j) {
// 				// console.log('j is ' + j);
// 				cell = [j, getDistance(starList[i], starList[j])];
// 				distanceRecordTable.push(cell);
// 			}
// 		}
// 		// console.log(i);
// 		// console.log(distanceRecordTable);
// 		pairList = findWings(distanceRecordTable);
// 		// console.log(pairList);
// 		for (var k = 0; k < pairList.length; k++){
// 			hashValue = getTubicSumHash(i, pairList[k][0], pairList[k][1]);
// 			if (!isAlreadyHad(caseList, hashValue)) {
// 				caseList.push(hashValue);
// 			}
// 		}
// 	}
// 	return caseList.length;
// 	// console.log('Case #' + caseNumber + ': ' + caseList.length);
// }

// function calculateBCAmount(rawDataList, start, end, nCounter) {
// 	var starList = [];
// 	// console.log(start, end);
// 	for (var i = 0; i < end - start + 1; i++) {
// 		// console.log(rawDataList[start+i]);
// 		// console.log('shit');
// 		point = [parseInt(rawDataList[start + i][0]), parseInt(rawDataList[start + i][1])];
// 		starList.push(point);
// 	}
// 	bcAmount = getCaseAmount(starList);
// 	// console.log(starList);
// 	console.log('Case #' + nCounter + ': ' + bcAmount);
// }

// function getTubicSumHash(a, b, c) {
// 	return a * a * a + b * b * b + c * c * c; 
// }

// function getDistance(starList[i], starList[j]) {
// 	return math.sqrt(math.pow(starList[i][0] - starList[j][0], 2) + math.pow(starList[i][1] - starList[j][1], 2));
// }


var splitList = [];
var rawDataList = [];
var fileName = 'boomerang_constellations.txt'
var array = fs.readFileSync(fileName).toString().split("\n");
for(i in array) {
	splitList = array[i].split(' ');
	rawDataList.push(splitList);
	// console.log(array[i]);
}

// console.log(rawDataList)
var nCounter = 1;
var pointer = 1;
var T = parseInt(rawDataList[0][0]);
// console.log(T);
while (nCounter <= T) {
	n = parseInt(rawDataList[pointer][0]);
	// calculateBCAmount(rawDataList, pointer + 1, pointer + n, nCounter);
	var starList = [];
	for (var i = 0; i < n; i++) {
		point = [parseInt(rawDataList[pointer + 1 + i][0]), parseInt(rawDataList[pointer + 1 + i][1])];
		starList.push(point);
	}
	// bcAmount = getCaseAmount(starList);
	var caseList = []
	var caseCount = 0;
	// console.log(starList);
	var starOtherDistanceTable = [];
	for (var i = 0; i < starList.length; i++) {
		// var distanceRecordTable = [];
		var lengthAmoutList = [];
		for (var j = 0; j < starList.length; j++) {
			if (i != j) {
				// console.log('j is ' + j);
				lengthAmoutList = handleLengthAmountList(lengthAmoutList, math.sqrt(math.pow(starList[i][0] - starList[j][0], 2) + math.pow(starList[i][1] - starList[j][1], 2)));


				// cell = [j, math.sqrt(math.pow(starList[i][0] - starList[j][0], 2) + math.pow(starList[i][1] - starList[j][1], 2))];
				// distanceRecordTable.push(cell);
			}
		}
		// console.log(lengthAmoutList);
		for (var k = 0; k < lengthAmoutList.length; k++) {
			if (lengthAmoutList[k][1] >= 2) {
				caseCount += factorial(lengthAmoutList[k][1]) / (2 * factorial(lengthAmoutList[k][1] - 2));
			}
		}
		// pairList = findWings(distanceRecordTable);
		// var pairList = [];
		// for (var k = 0; k < distanceRecordTable.length; k++) {
		// 	for (var l = k + 1; l < distanceRecordTable.length; l++) {
		// 		if (distanceRecordTable[k][1] == distanceRecordTable[l][1]) {
		// 			pair = [distanceRecordTable[k][0], distanceRecordTable[l][0]];
		// 			pairList.push(pair);
		// 		}
		// 	}
		// }
		// for (var k = 0; k < pairList.length; k++){
		// 	hashValue = i * i * i + pairList[k][0] * pairList[k][0] * pairList[k][0] + pairList[k][1] * pairList[k][1] * pairList[k][1];//getTubicSumHash(i, pairList[k][0], pairList[k][1]);
		// 	if (!isAlreadyHad(caseList, hashValue)) {
		// 		caseList.push(hashValue);
		// 	}
		// }
	}
	console.log('Case #' + nCounter + ': ' + caseCount);
	nCounter += 1;
	pointer += n + 1;
}

// console.log('fuck!');
