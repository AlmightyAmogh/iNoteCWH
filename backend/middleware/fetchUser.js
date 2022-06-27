const jwt = require('jsonwebtoken');
const JWT_Secret = "keepthisindotenv"

const fetchuser = (req,res,next) =>{
    // Get user from jwt token and append id to req obj
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please use valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_Secret)
        req.user = data.user 
       
    next()
    } catch (error) {
        res.status(401).send({error : "Please use valid token"})
    }

}


module.exports = fetchuser;