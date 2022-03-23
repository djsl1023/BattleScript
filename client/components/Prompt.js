import React from 'react';
import Editor from '@monaco-editor/react';

const Prompt = () => {
  return (
    <div>
      <div className="prompt-solution">
        <Editor height="95vh" width="45vw" defaultLanguage="javascript" defaultValue="Prompt" />
      </div>

      <div className="prompt-solution">
        <Editor height="95vh" width="45vw" defaultLanguage="javascript" defaultValue="Solution" />
      </div>
    </div>
  );
};

export default Prompt;
