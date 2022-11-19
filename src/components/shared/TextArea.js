import React from 'react';
import { useThemeContext } from '../../context-providers/ThemeProvider';

export default function TextArea({ name, value, onChange }) {
  const { theme } = useThemeContext();

  return (
    <textarea
      className=" flex flex-col w-full p-1 border-0 rounded outline-0  bg-white  mt-2"
      style={{ backgroundColor: theme.bgHighlight, color: theme.fgHighlight }}
      onChange={onChange}
      onInput={onChange}
      name={name}
      value={value}
    />
  );
}
