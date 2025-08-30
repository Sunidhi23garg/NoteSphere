import React from "react";

const Note = ({ note }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
};

export default Note;
