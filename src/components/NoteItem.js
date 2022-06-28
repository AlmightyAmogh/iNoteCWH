import React from "react";


const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          {/* <i className="fa fa-solid fa-trash-can mx-2"></i>
          <i className="fa fa-solid fa-pen-to-square mx-2"></i> */}
          <div className="d-flex align-items-center">
          <button type="button" className="btn btn-primary mx-3">Delete</button>
          <button type="button" className="btn btn-primary mx-3">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
