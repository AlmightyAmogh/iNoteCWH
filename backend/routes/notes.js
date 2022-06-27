const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchUser")
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route 1 : Get all notes using : GET "/api/notes/fetchallnotes ".login req"
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
           res.status(500).send("Internal Server Err")
    }
    
})

//Route 2 : Add new note using : Post "/api/notes/addnote"  .login req"
router.post('/addnote',fetchuser,[
   
    body('title',"enter atleast 3 char title").isLength({ min: 3 }),
    body('description',"password minimum 5 character").isLength({ min: 5 }),

],async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        // if errors return bad req and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
        }
    
    
        const note = new Note({
            title , description , tag , user : req.user.id
        })
    
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
           res.status(500).send("Internal Server Err")
    }
   
})


//Route 3 : Update note using : Put "/api/notes/updatenote/:id"  .login req"
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        //create new note obj
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found")}


        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true})
        res.json({note});
        
       
    } catch (error) {
        console.error(error.message);
           res.status(500).send("Internal Server Err")
    }
   
})

module.exports = router;