import React from 'react';

const SyntaxHighlightedCodeBlock = ({ code, language }) => {
  const highlight = (code) => {
    let highlightedCode = code;
    
    // Common
    highlightedCode = highlightedCode.replace(/(".*?"|'.*?')/g, '<span class="text-green-400">$1</span>'); // Strings
    highlightedCode = highlightedCode.replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>'); // Comments
    
    if (language === 'python') {
        highlightedCode = highlightedCode.replace(/\b(from|import|def|return|as)\b/g, '<span class="text-purple-400">$1</span>'); // Keywords
        highlightedCode = highlightedCode.replace(/\b(Slackify|OpenAI|Agent|Task|Crew|on_message)\b/g, '<span class="text-teal-400">$1</span>'); // Classes/Objects
        highlightedCode = highlightedCode.replace(/(@[a-zA-Z_]\w*)/g, '<span class="text-yellow-500">$1</span>'); // Decorators
        highlightedCode = highlightedCode.replace(/(\w+)\(/g, '<span class="text-blue-400">$1</span>('); // Function calls
    } else if (language === 'bash') {
        highlightedCode = highlightedCode.replace(/\b(npm|i|-g|xpander|login|agent|new)\b/g, '<span class="text-blue-400">$1</span>'); // commands
    }

    return <pre className="text-white whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
  };

  return (
    <div className="text-sm text-gray-300 p-4 font-mono overflow-x-auto">
      {highlight(code)}
    </div>
  );
};

export default SyntaxHighlightedCodeBlock;