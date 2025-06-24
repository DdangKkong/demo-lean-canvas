import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Note from './Note';
import { v4 as uuidv4 } from 'uuid';

// Canvas 내부의 Note CUD, Note사용
function CanvasCard({ title, isSubtitle = false, notes = [], onNotesChange }) {
  // Note 생성, onNotesChange 사용
  const handleAddNote = () => {
    const newNote = {
      id: uuidv4(),
      content: '',
      color: '',
    };
    onNotesChange([...notes, newNote]);
  };
  // Note 삭제, onNotesChange 사용
  const handleRemoveNote = id => {
    onNotesChange(notes.filter(note => note.id !== id));
  };
  // Note 수정, onNotesChange 사용
  const handleUpdateNote = (id, content, color) => {
    onNotesChange(
      notes.map(note => (note.id === id ? { ...note, content, color } : note)),
    );
  };
  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${isSubtitle === false && 'bg-gray-100 border-b border-b-gray-300'} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${isSubtitle === false && 'font-bold'}`}>{title}</h3>
        <button
          className="bg-blue-400  text-white p-1.5 text-xs rounded-md"
          onClick={handleAddNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            color={note.color}
            onRemoveNote={handleRemoveNote}
            onUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default CanvasCard;
