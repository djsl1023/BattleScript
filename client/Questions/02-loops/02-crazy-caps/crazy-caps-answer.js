// YOUR CODE BELOW
function crazyCaps(originalString) {
  let crazyString = '';

  for (let i = 0; i < originalString.length; i++) {
    let char = originalString[i];
    if (i % 2 === 0) {
      crazyString += char;
    } else {
      char = char.toUpperCase();
      crazyString += char;
    }
  }
  return crazyString;
}
