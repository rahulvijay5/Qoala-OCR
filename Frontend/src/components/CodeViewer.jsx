import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

function CodeViewer({ code, language = 'json', showLineNumbers = true, theme = dracula }) {
  
  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      theme = {theme}
      wrapLines
    />
  );
}

export default CodeViewer;
