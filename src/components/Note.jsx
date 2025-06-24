import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

// Canvas 화면에서 Note 정보 보여줌, id,content,color, Note 생성시 랜덤색상(randomIndex), Note의 content 작성시 줄 넘어가면 height 길어지게 설정 (스크롤X)
const Note = ({
  // Note 객체를 구성하는 항목들, onUpdateNote, onRemoveNote
  id,
  content,
  color: initalColor,
  onUpdateNote,
  onRemoveNote,
}) => {
  const [localContent, setLocalContent] = useState(content);
  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  // Note의 색상 설정, Note 생성시 랜덤색상(randomIndex)
  const [color, setColor] = useState(() => {
    if (initalColor) return initalColor;
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  });

  const [isEditing, setIsEditing] = useState(false);

  // Note의 content 작성시 줄 넘어가면 height 길어지게 설정 (스크롤X)
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [localContent]);

  // Note의 content 수정
  const handleContentChange = () => {
    onUpdateNote(id, localContent, color);
  };

  // Note의 color 수정
  const handleColorChange = newColor => {
    setColor(newColor);
    onUpdateNote(id, content, newColor);
  };

  return (
    <div
      className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`}
      onClick={() => setIsEditing(true)}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button
            aria-label="Check Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={e => setLocalContent(e.target.value)}
        onBlur={handleContentChange}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
      />
      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              onClick={() => handleColorChange(option)}
              aria-label={`Change color to ${option}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
