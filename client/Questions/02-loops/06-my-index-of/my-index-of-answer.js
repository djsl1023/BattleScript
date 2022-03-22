// YOUR CODE BELOW
function myIndexOf(source, searchValue, startIdx) {
  if (startIdx === undefined) {
    startIdx = 0;
  }

  for (let i = startIdx; i <= source.length - searchValue.length; i++) {
    let substring = source.slice(i, i + searchValue.length);

    if (substring === searchValue) {
      // ...return the current index
      return i;
    }
  }

  return -1;
}

function myIndexOf2(source, searchValue, startIdx = 0) {
  for (let i = startIdx; i <= source.length - searchValue.length; i++) {
    let substring = source.slice(i, i + searchValue.length);

    if (substring === searchValue) {
      return i;
    }
  }

  return -1;
}
