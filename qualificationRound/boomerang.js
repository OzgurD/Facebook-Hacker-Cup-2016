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

function IdxArray(m, idxArray) {
    this.m = m;
    this.idxArray = idxArray;
}

IdxArray.prototype.hasNext = function() {
    return this.idxArray[0] < this.m - this.idxArray.length;
};

IdxArray.prototype.position = function() {
    if(this.idxArray[this.idxArray.length - 1] != this.m - 1) {
        return this.idxArray.length - 1;
    }
    else {
        var pos = this.idxArray.length - 2;
        while(this.idxArray[pos + 1] - this.idxArray[pos] == 1) { pos--;}
        return pos;
    }
};

IdxArray.prototype.next = function() {
    var pos = this.position();
    var idxArr = this.idxArray.slice(0, pos);
    idxArr.push(this.idxArray[pos] + 1);
    for(var i = pos + 1; i < this.idxArray.length; i++) {
        idxArr.push(idxArr[i - 1] + 1);
    }
    return new IdxArray(this.m, idxArr);
};

IdxArray.prototype.toList = function(src) {
    return this.idxArray.map(function(idx) { return src[idx]; });
};

IdxArray.get = function(m, n) {
    var idxArray = [];
    for(var i = 0; i < n; i++) { idxArray.push(i); }
    return new IdxArray(m, idxArray);
};

function from(src, n) {
    var idxArray = IdxArray.get(src.length, n);
    var all = [];
    all.push(idxArray.toList(src));
    while(idxArray.hasNext()) {
        idxArray = idxArray.next();
        all.push(idxArray.toList(src));
    }
    return all;
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

function getDistance(starList[i], starList[j]) {
	return math.sqrt(math.pow(starList[i][0] - starList[j][0], 2) + math.pow(starList[i][1] - starList[j][1], 2));
}


function isExistBoomerang(combination, starList) {
	var distanceList = []
	for (var i = 0; i < combination.length; i++) {
		for (var j = i + 1; j < combination.length; j++) {
			distanceList.push(getDistance(starList[combination[i]], starList[combination[j]]));
		}
	}
	for (var k = 0; k < distanceList.length; k++) {
		for (var l = k + 1; l < distanceList.length; l++) {
			if (distanceList[k] == distanceList[l]) {
				return true;
			}
		}	
	}
	return false;
}

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
	list = [];
	for (var i = 0; i < pointer; i++) {
		list.push(i);
	}
	combinationList = [];

	from(list, 3).forEach(function(lt) { combinationList.push(lt); });
	// bcAmount = getCaseAmount(starList);
	// var caseList = []
	// // console.log(starList);
	// for (var i = 0; i < starList.length; i++) {
	// 	var distanceRecordTable = [];
	// 	for (var j = 0; j < starList.length; j++) {
	// 		if (i != j) {
	// 			// console.log('j is ' + j);

	// 			cell = [j, math.sqrt(math.pow(starList[i][0] - starList[j][0], 2) + math.pow(starList[i][1] - starList[j][1], 2))];
	// 			distanceRecordTable.push(cell);
	// 		}
	// 	}
	// 	// pairList = findWings(distanceRecordTable);
	// 	var pairList = [];
	// 	for (var k = 0; k < distanceRecordTable.length; k++) {
	// 		for (var l = k + 1; l < distanceRecordTable.length; l++) {
	// 			if (distanceRecordTable[k][1] == distanceRecordTable[l][1]) {
	// 				pair = [distanceRecordTable[k][0], distanceRecordTable[l][0]];
	// 				pairList.push(pair);
	// 			}
	// 		}
	// 	}
	// 	for (var k = 0; k < pairList.length; k++){
	// 		hashValue = i * i * i + pairList[k][0] * pairList[k][0] * pairList[k][0] + pairList[k][1] * pairList[k][1] * pairList[k][1];//getTubicSumHash(i, pairList[k][0], pairList[k][1]);
	// 		if (!isAlreadyHad(caseList, hashValue)) {
	// 			caseList.push(hashValue);
	// 		}
	// 	}
	// }
	console.log('Case #' + nCounter + ': ' + caseList.length);
	nCounter += 1;
	pointer += n + 1;
}

// console.log('fuck!');
