import React from "react"
import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState = (props) =>{
    
    const notesInitial = 
        [
            {
              "_id": "62a18f546d98324b1f15346a",
              "user": "62a0a52e6b5b5c2a0beaed5e",
              "title": "First Note",
              "description": "Trying note routes",
              "tag": "personal",
              "date": "2022-06-09T06:12:36.668Z",
              "__v": 0
            },
            {
              "_id": "62a18fc26d98324b1f15346c",
              "user": "62a0a52e6b5b5c2a0beaed5e",
              "title": "First Note",
              "description": "Trying note routes",
              "tag": "personal",
              "date": "2022-06-09T06:14:26.487Z",
              "__v": 0
            },
            {
              "_id": "62a18fc26d98324b1f15346e",
              "user": "62a0a52e6b5b5c2a0beaed5e",
              "title": "First Note updated",
              "description": "Trying note routess updated",
              "tag": "learning",
              "date": "2022-06-09T06:14:26.868Z",
              "__v": 0
            }
          ]
    const[notes,setNotes] = useState(notesInitial);
    
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;