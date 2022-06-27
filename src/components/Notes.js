import React from "react";
import { useContext } from 'react'
import noteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext);
  const {notes,setNotes} = context;
  return (
    <div className="row my-3">
      <h2>Your noTes</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
    </div>
  );
};

export default Notes;
