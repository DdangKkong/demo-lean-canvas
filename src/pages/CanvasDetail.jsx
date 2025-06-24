import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { getCanvasById, updateCanvas, updateTitle } from '../api/canvas';

// 홈화면에서 canvas 클릭했을때 화면, CanvasTitle,LeanCanvas적용
function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState();

  // id로 canvas 정보 조회
  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  // canvas 화면에서 Title 수정
  const handleTitleChange = title => {
    try {
      updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  // canvas 세부정보 수정시 update
  const handleCanvasChange = async updatedCanvas => {
    try {
      await updateCanvas(id, updatedCanvas);
      setCanvas(updatedCanvas);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && (
        <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />
      )}
    </div>
  );
}

export default CanvasDetail;
