// YOUR CODE BELOW
function exponentiate(base, power) {
  let result = 1;

  for (let i = 0; i < power; i++) {
    result *= base;
  }

  return result;
}

function exponentiate2(base, power) {
  if (power === 0) {
    return 1;
  }

  let result = base;

  while (power > 1) {
    result *= base;
    power--;
  }

  return result;
}
