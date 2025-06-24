import React from 'react';
import { FaList, FaTh } from 'react-icons/fa';

// Home 화면에서 canvas들을 list형태로 볼건지 icon형태로 볼건지 선택할 수 있게 해줌
function ViewToggle({ isGridView, setIsGridView }) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setIsGridView(true)}
        className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="Grid view"
      >
        <FaTh />
      </button>
      <button
        onClick={() => setIsGridView(false)}
        className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="List view"
      >
        <FaList />
      </button>
    </div>
  );
}

export default ViewToggle;
