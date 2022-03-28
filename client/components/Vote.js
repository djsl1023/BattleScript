import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';

const Vote = () => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [userFocus, setUserFocus] = useState('');
  const users = useSelector((state) => state.users);
  const currPrompt = useSelector((state) => state.prompt);
  const submissions = useSelector((state) => {
    if (state.gameStatus === 'failvote') {
      return state.failedAnswers;
    } else if (state.gameStatus === 'passvote') {
      return state.passedAnswers;
    }
  });
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log(editorRef);
  }
  const changeFocus = (e, userKey) => {
    e.preventDefault();
    setUserFocus(userKey);
    editorRef.current.setValue(submissions[userKey].answer);
  };
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
          defaultValue="//Select a user from the side to see their code! ----------------->"
          options={{
            readOnly: true,
            wordWrap: true,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="user-list">
        {Object.keys(submissions).map((userKey) => {
          return (
            <div key={userKey}>
              <button value={userKey} onClick={(e) => changeFocus(e, userKey)}>
                {users[userKey].username}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vote;
