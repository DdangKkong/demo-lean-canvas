import React from 'react';
import CanvasItem from './CanvasItem';

// Home화면에서 조회된 Canvas의 List를 나열해줌, CanvasItem적용, canvas가 없을때, '검색 결과가 없습니다' 혹은 '목록이 없습니다' 출력
function CanvasList({ filteredData, searchText, isGridView, onDeleteItem }) {
  // canvas가 없을때, '검색 결과가 없습니다' 혹은 '목록이 없습니다' 출력
  if (filteredData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          {searchText ? '검색 결과가 없습니다' : '목록이 없습니다'}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
    >
      {filteredData.map(item => (
        <CanvasItem
          key={item.id}
          id={item.id}
          title={item.title}
          lastModified={item.lastModified}
          category={item.category}
          onDelete={e => {
            e.preventDefault();
            onDeleteItem(item.id);
          }}
        />
      ))}
    </div>
  );
}

export default CanvasList;
