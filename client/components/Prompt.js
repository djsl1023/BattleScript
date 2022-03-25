import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';

const Prompt = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const currPrompt = useSelector((state) => state.prompt);

  function onChangeHandler(evt) {
    evt.preventDefault();
    setUserAnswer(evt.target.value);
  }

  return (
    <div>
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
