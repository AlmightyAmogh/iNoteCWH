import { Delete, Edit } from "@material-ui/icons";
import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";


const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note ,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body my-3">
          <div className="d-flex align-items-center mx-3">
          <h5 className="card-title ">{note.title}</h5>
          <Delete onClick={()=>{deleteNote(note._id)}}></Delete>
          <Edit onClick={()=>{updateNote(note)}}></Edit>
          </div>
         
          <p className="card-text">{note.description}</p>
          {/* <i className="fa fa-solid fa-trash-can mx-2"></i>
          <i className="fa fa-solid fa-pen-to-square mx-2"></i> */}
          
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
