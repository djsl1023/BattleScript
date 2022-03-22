function howEqual(value1, value2) {
  if (value1 === value2) {
    return 'strictly';
  } else if (value1 == value2) {
    return 'loosely';
  } else {
    return 'not equal';
  }
}

function howEqual2(value1, value2) {
  if (value1 === value2) {
    return 'strictly';
  }

  if (value1 == value2) {
    return 'loosely';
  }

  return 'not equal';
}
