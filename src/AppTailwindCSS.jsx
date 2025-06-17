import React from 'react';
import TailwindButton from './components/TailwindCss/TailwindButton';

function AppTailwindCSS() {
  return (
    <>
      <h1 className="text-sky-300 text-3xl font-bold underline">Hello</h1>
      <TailwindButton>TailwindButton</TailwindButton>
    </>
  );
}

export default AppTailwindCSS;
