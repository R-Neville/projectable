import React from 'react';
import { format } from 'date-fns';
import { useThemeContext } from '../context-providers/ThemeProvider';

export default function DateDisplay() {
  const { theme } = useThemeContext();
  let nd = new Date();

  let currentDate = {
    day: format(nd, 'dd'),
    dayDisplay: format(nd, 'd'),
    month: format(nd, 'MM'),
    monthDisplay: format(nd, 'MMM'),
    year: format(nd, 'y'),
    weekday: format(nd, 'EEEE'),
  };

  return (
    <div
      className="flex items-center justify-end px-2 m-4 text-m max-w-xs"
      style={{ color: theme.fgPrimary }}
    >
      <div className="flex items-center">
        <div className="text-3xl mx-2 font-bold">{currentDate.dayDisplay}</div>
        <div className="pr-2">
          <div>{currentDate.monthDisplay}</div>
          <div>{currentDate.year}</div>
        </div>
      </div>
      <div className="today">{currentDate.weekday}</div>
    </div>
  );
}
