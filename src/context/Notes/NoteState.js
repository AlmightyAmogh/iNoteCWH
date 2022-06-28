import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host= 'http://localhost:5000'
  const notesInitial = [];
  
  const [notes, setNotes] = useState(notesInitial);

// Get all notes
const getNotes = async () => {
  //api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGE1MmU2YjViNWMyYTBiZWFlZDVlIn0sImlhdCI6MTY1NDY5Njc5M30.HZ_LnA2GTle2PlksH5Zxd7C8tDu1ftZDnvUagxWm5E4'
      
    }
    
  })
const json = await response.json();
console.log(json)
setNotes(json);
};



  // Add note
  const addNote = async (title,description,tag) => {
      //api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGE1MmU2YjViNWMyYTBiZWFlZDVlIn0sImlhdCI6MTY1NDY5Njc5M30.HZ_LnA2GTle2PlksH5Zxd7C8tDu1ftZDnvUagxWm5E4'
          
        },
        
        body: JSON.stringify({title,description,tag}) 
      })
    //  const json = response.json();
    //client side
    console.log("adding new note")
    const note = {
      _id: "62a18fc26d98324b1f15343d",
      user: "62a0a52e6b5b5c2a0beaed5e",
      title: title,
      description: description,
      tag: "default",
      date: "2022-06-09T06:14:26.487Z",
      __v: 0,
    }
    setNotes(notes.concat(note))
  };


  // Delete note
  const deleteNote = (id) => {
    //api call 


    //client side
    console.log('deleting node with id :' + id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);
  };
  // Edit note





  const editNote = async (id,title,description,tag) => {  
    //api call 
    const response = await fetch(`${host}/api/notes/updatenote/62a18fc26d98324b1f15346e/${id}`, {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGE1MmU2YjViNWMyYTBiZWFlZDVlIn0sImlhdCI6MTY1NDY5Njc5M30.HZ_LnA2GTle2PlksH5Zxd7C8tDu1ftZDnvUagxWm5E4'
        
      },
      
      body: JSON.stringify({title,description,tag}) 
    })
   const json = response.json();
  
  //Logic to edit in client
    for(let index=0;index<notes.length();index++){
      const element = notes[index];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag=tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
