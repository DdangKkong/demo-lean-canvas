import { useEffect, useState } from 'react';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';

import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import CategoryFilter from '../components/CategoryFilter';

// 홈화면, SearchBar,CategoryFilter,ViewToggle,Button,Loading,Error,CanvasList 적용, canvas 수정을 제외한 기능 구현
function Home() {
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 필터 CategoryFilter 적용
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });
  const handleFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };
  useEffect(() => {
    fetchData();
  }, [filter]);

  // canvases List 조회 (홈화면), setTimeout 걸어주기
  async function fetchData() {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolver => setTimeout(resolver, 500));
      const response = await getCanvases({
        title_like: filter.searchText,
        category: filter.category,
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  // canvas 삭제, '삭제 하시겠습니까?'
  const handleDeleteItem = async id => {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    try {
      await deleteCanvas(id);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // canvas 생성, setTimeout 걸어주기
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const handleCreateCanvas = async () => {
    try {
      setIsLoadingCreate(true);
      await new Promise(resolver => setTimeout(resolver, 500));
      await createCanvas();
      fetchData();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={() => fetchData({ title_like: searchText })}
        />
      )}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={filter.searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
