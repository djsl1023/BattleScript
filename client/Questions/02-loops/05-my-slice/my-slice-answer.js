// YOUR CODE BELOW
function mySlice(originalString, startIdx, endIdx) {
  if (startIdx === undefined && endIdx === undefined) {
    return originalString;
  }

  if (startIdx === undefined) {
    startIdx = 0;
  }

  if (endIdx === undefined) {
    endIdx = originalString.length;
  }

  let slicedString = '';

  for (let i = startIdx; i < endIdx; i++) {
    let char = originalString[i];
    slicedString += char;
  }

  return slicedString;
}
