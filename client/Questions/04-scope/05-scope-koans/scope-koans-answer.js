let testOneMessage = 'test failing';

function testOne(testOneMessage) {
  return testOneMessage;
}

let testTwoMessage = 'test failing';

function testTwo() {
  helperFunc();
  return testTwoMessage;
}

function helperFunc(a) {
  testTwoMessage = 'test succeeding';
  return a;
}

let testThreeMessage = 'test failing';

function testThree(testThreeMessage) {
  if (testThreeMessage) {
    testThreeMessage = 'test succeeding';
  }

  let msg = getMessage(1);
  return msg;

  function getMessage(value) {
    if (value) {
      return testThreeMessage;
    }

    return 'test failing';
  }
}

let testFourMessage = 'test succeeding';

function testFour(msg) {
  function innerFunc(msg) {
    msg = msg;

    function doubleInner(ms) {
      testFourMessage = msg;
      return testFourMessage;
    }

    testFourMessage = doubleInner('test failing');
  }

  innerFunc(testFourMessage);

  msg = testFourMessage;
  return testFourMessage;
}
