import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import testSpecs from './mocha/testSpec';
import { setResult } from '../store/result';

const Prompt = () => {
  const dispatch = useDispatch();
  const [userAnswer, setUserAnswer] = useState('');
  const [testHTML, setTestHTML] = useState('');
  const [testResult, setTestResult] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const currPrompt = useSelector((state) => state.prompt);
  console.log(testHTML);
  //LISTEN FROM LOWER WINDOW FOR UPDATE
  window.addEventListener('message', windowHandler);
  function windowHandler(e) {
    if (typeof e.data === 'string') {
      setTestResult(JSON.parse(e.data));
    }
  }
  function onChangeHandler(e) {
    setUserAnswer(e);
  }
  function clickHandler() {
    createTest();
    setSubmitted(true);
  }
  if (submitted) {
    dispatch(setResult({ answer: userAnswer, result: testResult }));
  }
  async function createTest() {
    let testing = `<html>
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
  ${testSpecs(currPrompt.testSpecs)}
  ${userAnswer}
  </script>
  </body>
  </html>`;

    setTestHTML(testing);
  }

  return (
    <div>
      <div>
        {submitted ? (
          <iframe
            id="mochaTester"
            srcDoc={testHTML}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          ''
        )}
      </div>
      <button onClick={() => clickHandler()}>CLICK ME</button>
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
