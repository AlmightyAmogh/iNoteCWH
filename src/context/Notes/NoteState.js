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
// console.log(json)
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
      const note = await response.json()
      // console.log(note);
    //clientside
    setNotes(notes.concat(note))
  };


  // Delete note
  const deleteNote = async (id) => {
    //api call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGE1MmU2YjViNWMyYTBiZWFlZDVlIn0sImlhdCI6MTY1NDY5Njc5M30.HZ_LnA2GTle2PlksH5Zxd7C8tDu1ftZDnvUagxWm5E4'
        
      }
      
    })
    const json = await response.json()
    // console.log(json);

    //client side
    // console.log('deleting node with id :' + id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);
  };
  // Edit note





  const editNote = async (id,title,description,tag) => {  
    //api call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGE1MmU2YjViNWMyYTBiZWFlZDVlIn0sImlhdCI6MTY1NDY5Njc5M30.HZ_LnA2GTle2PlksH5Zxd7C8tDu1ftZDnvUagxWm5E4'
        
      },
      
      body: JSON.stringify({title,description,tag}) 
    })
    const json = await response.json()
    // console.log(json);
  



  //Logic to edit in client

    let newNotes = await JSON.parse(JSON.stringify(notes))


    for(let index=0;index<newNotes.length;index++){
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
