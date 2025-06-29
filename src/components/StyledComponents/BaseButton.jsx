import React from 'react';

function BaseButton({ className, children }) {
  return <button className={className}>{children}</button>;
}

export default BaseButton;
