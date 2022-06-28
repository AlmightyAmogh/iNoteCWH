import { Delete, Edit } from "@material-ui/icons";
import React from "react";


const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body my-3">
          <div className="d-flex align-items-center mx-3">
          <h5 className="card-title ">{note.title}</h5>
          <Delete ></Delete>
          <Edit></Edit>
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
