import React from 'react';
import { FaSpinner } from 'react-icons/fa';

// 기본 버튼 스타일링, 로딩시 버튼 클릭 불가
function Button({ loading = false, onClick, className, children }) {
  const clazz = [
    'bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    className,
  ].join(' ');

  // 로딩시에는 버튼 클릭 불가
  const handleClick = () => {
    if (loading) {
      return;
    }
    onClick();
  };
  return (
    <button onClick={handleClick} className={clazz} disabled={loading}>
      <span className="flex items-center justify-center">
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {children}
      </span>
    </button>
  );
}

export default Button;
