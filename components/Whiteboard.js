import React, { useRef, useEffect, useState } from 'react';
import StickyNote from './StickyNote';
import KanbanBoard from './KanbanBoard';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const addStickyNote = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const newNote = {
      id: Date.now(),
      x: offsetX,
      y: offsetY,
      content: 'New Note',
    };
    setNotes([...notes, newNote]);
  };

  const updateStickyNote = (id, content) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content } : note));
  };

  const deleteStickyNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onDoubleClick={addStickyNote}
        style={{ border: '1px solid black' }}
      />
      {notes.map(note => (
        <StickyNote
          key={note.id}
          note={note}
          onUpdate={updateStickyNote}
          onDelete={deleteStickyNote}
        />
      ))}
      <KanbanBoard />
    </div>
  );
};

export default Whiteboard;
