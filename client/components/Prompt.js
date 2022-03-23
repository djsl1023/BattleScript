import React from 'react';
import Editor from '@monaco-editor/react';

const Prompt = () => {
  return (
    <div>
      <Editor height="50vh" defaultLanguage="javascript" defaultValue="Prompt" />
      <Editor height="50vh" defaultLanguage="javascript" defaultValue="Solution" />
    </div>
  );
};

export default Prompt;
