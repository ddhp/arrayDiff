/**
 * given a @length
 * and random an array without duplicated element
 *
 */
function randomArrFixLengthWithRange(length, range) {
  var result = [],
      count = length;
  while (length > 0) {
    var v;
    do {
      v = Math.ceil(Math.random() * range);
    } while (result.indexOf(v) !== -1);
    result.push(v);
    length --;
  }
  return result;
}

function sortFunc(a, b) {
  return a -b;
}

var aArr = randomArrFixLengthWithRange(10, 20);
var bArr = randomArrFixLengthWithRange(8, 14);
var count = 0;

/**
 * Iterate through a to compare with each b
 *
 */
function compareArray(a, b) {
  var diffs = []
  Array.prototype.some.call(a, function(numA, idxA) {
    Array.prototype.some.call(b, function(numB, idxB) {
      console.log('comparing ' + numA + ' with ' + numB);
      console.log('compare count:', ++count);
      // break if 2 element are equal
      if (numA === numB) {
        return true
      }
      // find a diff if numB is bigger than numA
      if (numB > numA) { 
        diffs.push(numA);
        return true
      }
    });
    // break if numA is bigger than last element of bArr
    // slice rest of elements into diffs
    if (numA > b[b.length -1]) {
      console.log('all diffs after this idx:', idxA);
      var rests = Array.prototype.slice.call(a, idxA);
      console.log('rests:', rests);
      diffs = diffs.concat(rests);
      return true;
    }
  });
  return diffs;
}

aArr.sort(sortFunc);
bArr.sort(sortFunc);
console.log(aArr);
console.log(bArr);


var firstDiffs = compareArray(aArr, bArr);
var secondDiffs = compareArray(bArr, aArr)
console.dir(firstDiffs);
console.dir(secondDiffs);

var diffs = firstDiffs.concat(secondDiffs);
console.log(diffs);
