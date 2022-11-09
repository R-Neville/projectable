import React from 'react'
import { useThemeContext } from '../../context-providers/ThemeProvider';


export default function TextArea({type, name, onchange}) {
    const { theme } = useThemeContext();

  return (
    <textarea
      className=" flex flex-col w-full p-1 border-0 rounded outline-0  bg-white  mt-2"
      style={{ backgroundColor: theme.bgHighlight, color: theme.fgHighlight }}
    ></textarea>
  );
}