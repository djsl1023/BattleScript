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
  //Get Current Round's user: vote Object
  const voteList = useSelector((state) => {
    if (state.gameStatus === 'failvote') {
      return state.failedVotes;
    } else if (state.gameStatus === 'passvote') {
      return state.passedVotes;
    }
  });
  //Get current round's user: answer object
  const submissions = useSelector((state) => {
    if (state.gameStatus === 'failvote') {
      return state.failedAnswers;
    } else if (state.gameStatus === 'passvote') {
      return state.passedAnswers;
    }
  });
  // Add listener depending on whether it is failvote or passvote round
  // This listener will later update client state when server state updates vote count
  if (room.state.gameStatus === 'failvote') {
    room.state.failVotes.onChange = (vote, key) => {
      dispatch(setFailedVotes(key, vote));
    };
  } else if (room.state.gameStatus === 'passvote') {
    room.state.passVotes.onChange = (vote, key) => {
      dispatch(setPassedVotes(key, vote));
    };
  }

  //Get editor reference so we can use it later to change contents
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  //Changes who's code/vote is being selected based on what the user clicks
  const changeFocus = (userKey) => {
    setUserFocus(userKey);
    editorRef.current.setValue(submissions[userKey].answer);
    console.log(userKey);
  };

  //When user clicks vote, sets voting to true so they cannot vote again,
  //Then, sets votedfor so the user knows who they voted for
  //finally, sends update to server state stating who was voted for
  //Server changes state -> client is listening for changes -> changes client state
  const voteHandler = (e, userFocus, gameStatus) => {
    setVoted(true);
    setVotedFor(users[userFocus].username);
    room.send(gameStatus, { solutionId: userFocus });
  };
  if (submissions.length <= 0) {
    return <div>No submissions</div>;
  } else {
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
                <button value={userKey} onClick={() => changeFocus(userKey)}>
                  {users[userKey].username}:{' '}
                  {voteList[userKey] ? voteList[userKey] : 0}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Vote;
