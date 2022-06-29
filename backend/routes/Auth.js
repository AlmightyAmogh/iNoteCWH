const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = "keepthisindotenv"
const fetchuser = require("../middleware/fetchUser")
//Route 1 : Creating a user using : POST : "/api/auth/createuser     .No login req"

router.post('/createuser', [
    body('email',"enter a valid email").isEmail(),
    body('name',"enter a valid name").isLength({ min: 3 }),
    body('password',"password minimum 5 character").isLength({ min: 5 }),
],async (req,res)=>{
   let Success = false;
    // if errors return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Success,errors: errors.array() })
    }

    // check whether user with same email exists already
    try {     
    
    let user = await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({Success,error:"user with email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    // Create a new user 
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      const data = {
        user : {
          id : user.id
        }
      }
      const authToken=jwt.sign(data,JWT_Secret);

      // res.json(user)
      Success = true;
      res.json({authToken})
    }
       catch (error) {
           console.error(error.message);
           res.status(500).send("Internal Server Err")
       }
 })

//Route 2 :Authenticate a user using : POST : "/api/auth/createuser     .No login req"
router.post('/login', [
  body('email',"enter a valid email").isEmail(),
  
  body('password',"password not blank ").exists(),
],async (req,res)=>{
  let Success = false;
  // if errors return bad req and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const {email,password} = req.body;
  try {
    let user =  await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"use correct credentials"})
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({Success,error:"use correct credentials"})
      Success = false;
    }
    const data = {
      user : {
        id : user.id
      }
    }
    const authToken=jwt.sign(data,JWT_Secret);
    Success = true;
    res.json({Success,authToken})
  } catch (error) {
    console.error(error.message);
           res.status(500).send("Internal Server Err")
  }
})

//Route 3 :Get logged in user details using : POST : "/api/auth/getuser     .login req"

router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Err");
    }
  }
);
module.exports = router;