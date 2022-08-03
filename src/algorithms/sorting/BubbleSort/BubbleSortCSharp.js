import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
const BubbleSortCSharp = ({ example }) => {
  return (
    <CopyBlock
    language={"C"}
    text={`
    for(int j = 0; j <= arr.Length - 2; j++)
    {
        for(int i = 0; i <= arr.Length - 2; i++) 
        {
            if(arr[i] > arr[i + 1]) 
            {
                temp = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = temp;
            }
        }
    }`}
    showLineNumbers={true}
    theme={dracula}
    wrapLines={true}
    codeBlock
  />
  );
};

export default BubbleSortCSharp;
