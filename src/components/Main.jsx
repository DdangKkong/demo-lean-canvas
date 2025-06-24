import React from 'react';

// 메인 태그 커스터마이징, 기본 css
function Main({ children }) {
  return <main className="container mx-auto px-4 py-16">{children}</main>;
}

export default Main;
