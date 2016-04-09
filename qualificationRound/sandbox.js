var fs = require('fs');
var math = require('mathjs');

function findWings(table) {
	pairList = [];
	for (var k = 0; k < table.length; k++) {
		for (var l = k + 1; l < table.length; l++) {
			if (table[k][1] == table[l][1]) {
				pair = [table[k][0], table[l][0]];
				pairList.push(pair);
			}
		}
	}
	return pairList;
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


list = [];
n = 1000;
for (var i = 0; i < n; i++) {
	list.push(i);
}
combinationList = [];

from(list, 3).forEach(function(lt) { combinationList.push(lt); });
console.log(combinationList);
console.log(combinationList.length);
// console.log(list);


// table = [[1, 1], [2, 2], [3, 2], [4, 4], [5, 2]];
// console.log(findWings(table));
