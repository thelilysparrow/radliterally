import React from 'react';

const StickyNote = ({ note, onUpdate, onDelete }) => {
  return (
    <div style={{ position: 'absolute', left: note.x, top: note.y, background: 'yellow', padding: '10px' }}>
      <textarea value={note.content} onChange={(e) => onUpdate(note.id, e.target.value)} />
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default StickyNote;
