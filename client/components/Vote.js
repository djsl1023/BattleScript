import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { setFailedVotes } from '../store/failVoting';
import { setPassedVotes } from '../store/passVoting';

const Vote = () => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [voted, setVoted] = useState(false);
  const [votedFor, setVotedFor] = useState('');
  const [userFocus, setUserFocus] = useState('');
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);
  const currPrompt = useSelector((state) => state.prompt);
  const voteList = useSelector((state) => {
    if (state.gameStatus === 'failvote') {
      return state.failedVotes;
    } else if (state.gameStatus === 'passvote') {
      return state.passedVotes;
    }
  });
  const submissions = useSelector((state) => {
    if (state.gameStatus === 'failvote') {
      state.failVotes.onChange = (clientVotes, key) => {
        dispatch(setFailedVotes(key, clientVotes));
      };
      return state.failedAnswers;
    } else if (state.gameStatus === 'passvote') {
      state.passVotes.onChange = (clientVotes, key) => {
        dispatch(setPassedVotes(key, clientVotes));
      };
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

  const voteHandler = (e, userFocus, gameStatus) => {
    setVoted(true);
    setVotedFor(users[userFocus].username);
    room.send(gameStatus, { solutionId: userFocus });
  };
  return (
    <div className="prompt-container">
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
        <button
          className="submit-prompt-button"
          onClick={(e) => voteHandler(e, userFocus, room.state.gameStatus)}
          disabled={voted}>
          {voted ? `You've already voted for ${votedFor}!` : 'Vote!'}
        </button>
      </div>
      <div className="user-list">
        {Object.keys(submissions).map((userKey) => {
          return (
            <div key={userKey}>
              <button value={userKey} onClick={(e) => changeFocus(e, userKey)}>
                {users[userKey].username}: {}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vote;
