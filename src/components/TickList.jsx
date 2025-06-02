import React from 'react';
import './ListStyles.css';

export const TickList = ({ children }) => {
  return <ul className="tick-list">{children}</ul>;
};
