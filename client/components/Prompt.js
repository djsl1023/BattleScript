import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';

const Prompt = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [testHTML, setTestHTML] = useState('');
  const [restResult, setTestResult] = useState(false);
  const currPrompt = useSelector((state) => state.prompt);
  window.addEventListener('message', windowHandler);
  function windowHandler(e) {
    if (typeof e.data === 'string') {
      setTestResult(JSON.parse(e.data));
    }
  }
  function onChangeHandler(e) {
    setUserAnswer(e);
  }
  const testing = `<html>
<head>
    <meta charset="utf-8">
    <title>Mocha Tests</title>
    <link href="https://unpkg.com/mocha@4.0.1/mocha.css" rel="stylesheet" />
</head>
<body>
<div id="mocha"></div>

<script src="https://unpkg.com/chai@4.1.2/chai.js"></script>
<script src="https://unpkg.com/mocha@4.0.1/mocha.js"></script>

<script>
mocha.setup('bdd');
let expect = chai.expect;
let assert = chai.assert;

describe('onlyOdds', () => {

  it('is a function', () => {
    expect(typeof onlyOdds).to.equal('function');
  });

  it('returns a number', () => {
    let returnedValue = onlyOdds(6);
    expect(typeof returnedValue).to.equal('number');
  });

  it('returns the sum of all odd nums between the provided argument and 0', () => {
    let returnedValue = onlyOdds(10);
    expect(returnedValue).to.equal(9 + 7 + 5 + 3 + 1);
  });

  it('returns 0 if inputted argument is less than 1', () => {
    let returnedValue = onlyOdds(-5);
    expect(returnedValue).to.equal(0);
  });

});
mocha.checkLeaks();
mocha.run();
function onlyOdds(num) {
let sum = 0;
for (let i = num; i >= 1; i--) {
if (i % 2 === 1) {
  sum += i;
}
}
return sum;
}
</script>
</body>
</html>`;
  return (
    <div>
      <div>
        <iframe
          id="mochaTester"
          srcDoc={testing}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <div className="prompt-solution">
        <Editor
          height="95vh"
          width="45vw"
          defaultLanguage="javascript"
          defaultValue={currPrompt.question}
          options={{
            readOnly: true,
            wordWrap: true,
          }}
        />
      </div>

      <div className="prompt-solution">
        <Editor
          height="95vh"
          width="45vw"
          defaultLanguage="javascript"
          defaultValue="//Code Here"
          onChange={onChangeHandler}
          options={{
            readOnly: false,
            wordWrap: true,
          }}
        />
      </div>
    </div>
  );
};

export default Prompt;
