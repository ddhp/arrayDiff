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

  console.log('aArr before sort, ', aArr.join(','));
  console.log('bArr before sort, ', bArr.join(','));
  aArr.sort(sortFunc);
  bArr.sort(sortFunc);
  console.log('aArr after sort, ', aArr.join(','));
  console.log('bArr after sort, ', bArr.join(','));
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
  //  3) a_v bigger than b_v: continue to try next one
  //     
  for (var a_i = 0, b_l = shortArr.length; a_i < b_l; a_i ++) {
    var a_v = shortArr[a_i];
    for (var b_i = b_i_c, b_l = lngArr.length; b_i < b_l; b_i ++) {
      var b_v = lngArr[b_i];
      console.log('a_v = ' + a_v + ' and b_v = ' + b_v);
      
      if (a_v === b_v) {
        // lngChecked.push[b_i];
        sameArr.push(a_v);
        b_i_c = b_i + 1;
        console.log('b_i_c: ', b_i_c);
        console.log('pushed to sameArr', sameArr);
        break;
      }
      // if a_v bigger than b_v, push a_v to diffArr
      if (a_v < b_v) {
        diffArr.push(a_v);
        console.log('pushed to diff', diffArr);
        break;
      }
      // if a_v smaller than b_v, try next one
      if (a_v > b_v) {
        continue;
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
  console.log('lngArr after splice same elements: ', lngArr);
  return diffArr.concat(lngArr).sort(sortFunc);
}

var x = [1,3,93,4,8,5,15,14];
var y = [1,8,93,2,9,5,17,14, 27, 44, 16];
var result = arrayDiff(x, y);
console.log('diff result: ', result);
