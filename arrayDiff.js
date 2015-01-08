function randomArrFixLength(length) {
  var result = [],
      count = length;
  while (length > 0) {
    var v;
    do {
      v = Math.ceil(Math.random() * 100000);
    } while (result.indexOf(v) !== -1);
    result.push(v);
    length --;
  }
  return result;
}

// Diff two arrays
// return an array with none-duplicated elements
var arrayDiff = function (aArr, bArr) {
  // - sort 2 arrays
  // - go through the shorter one
  // - push the impossible duplicated element into diffArr
  var diffArr = [],
      b_i_c = 0, // index of already checked lngArr
      sortFunc = function (a, b) {
        return a -b;
      },
      shortArr,
      lngArr,
      sameArr = [];

  // console.log('aArr before sort, ', aArr.join(','));
  // console.log('bArr before sort, ', bArr.join(','));
  aArr.sort(sortFunc);
  bArr.sort(sortFunc);
  // console.log('aArr after sort, ', aArr.join(','));
  // console.log('bArr after sort, ', bArr.join(','));
  shortArr = aArr.length < bArr.length ? aArr : bArr;
  lngArr = aArr.length >= bArr.length ? aArr : bArr;

  // go through short array
  // take current value as `a_v`
  // then go through longer array
  // it's value as `b_v`
  // three possibilities
  //  1) a_v equals b_v: which means duplicated element
  //      - push to `sameArr`,
  //      - set b_i_c (checked index of bArr(lngArr)) to current b_i + 1,
  //        to let next loop check from next index
  //      - break current loop
  //  2) a_v smaller then b_v: this a_v is a diff, not possible to match any elements in lngArr in the future loop
  //      - push to `diffArr`
  //      - break current loop
  //  3) a_v bigger than b_v: continue to try next one, or if it's the last index of b, than push it to diffArr
  //     
  for (var a_i = 0, b_l = shortArr.length; a_i < b_l; a_i ++) {
    var a_v = shortArr[a_i];
    for (var b_i = b_i_c, b_l = lngArr.length; b_i < b_l; b_i ++) {
      var b_v = lngArr[b_i];
      // console.log('a_v = ' + a_v + ' and b_v = ' + b_v);
      
      if (a_v === b_v) {
        // lngChecked.push[b_i];
        sameArr.push(a_v);
        b_i_c = b_i + 1;
        // console.log('b_i_c: ', b_i_c);
        // console.log('pushed to sameArr', sameArr);
        break;
      }
      // if a_v bigger than b_v, push a_v to diffArr
      if (a_v < b_v) {
        diffArr.push(a_v);
        // console.log('pushed to diff', diffArr);
        break;
      }
      // if a_v smaller than b_v, try next one
      if (a_v > b_v) {
        if (!(b_i === b_l -1)) {
          continue;
        } else {
          diffArr.push(a_v);
        }
      }
    }
  }

  // go through sameArr
  // remove every same elements in lngArr
  // then join diff with diffArr
  for (var i = 0, l = sameArr.length; i < l; i ++) {
    var v = sameArr[i];
    lngArr.splice(lngArr.indexOf(v), 1);
  }
  // console.log('lngArr after splice same elements: ', lngArr);
  return diffArr.concat(lngArr).sort(sortFunc);
}


var x = randomArrFixLength(10000);
var y = randomArrFixLength(20000);
var startTime = new Date().getTime();
var diffArr = arrayDiff(x, y.slice());
var timeTook = new Date().getTime() - startTime;
console.log('a_1 length: ', diffArr.length);
console.log('Time took: ', timeTook);

var sortFunc = function (a, b) {
  return a -b;
};
var startTime = new Date().getTime();
var sX = x.sort(sortFunc);
var sY = y.sort(sortFunc);
var differentArr = [];
for (var i = 0, l = sX.length; i < l; i ++) {
  var v = sX[i];
  if (sY.indexOf(v) < 0) {
    differentArr.push(v);
  }
}
for (var i = 0, l = sY.length; i < l; i ++) {
  var v = sY[i];
  if (sX.indexOf(v) < 0) {
    differentArr.push(v);
  }
}
var timeTook = new Date().getTime() - startTime;
differentArr = differentArr.sort(sortFunc);
console.log('a_2 length: ', differentArr.length);
console.log('Time took: ', timeTook);

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

console.log('is the same? ', arraysEqual(diffArr, differentArr));
