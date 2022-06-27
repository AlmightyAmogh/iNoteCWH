const connectToMongo = require('./db');
const express = require('express');
const authRoute = require('./routes/Auth')
const notesRoute = require('./routes/notes')

connectToMongo();
const app = express();
const port = 5000;

// app.get('/',(req,res) =>{
//     res.send("hello world");
// })

app.use(express.json());
//available routes 
app.use('/api/auth',authRoute)
app.use('/api/notes',notesRoute)

app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`)
})