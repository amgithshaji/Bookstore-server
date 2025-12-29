const jwt = require('jsonwebtoken')

const adminMiddleware = (req,res,next)=>{
console.log("Inside adminMiddleware");
// logic to verify token 
// get token - req header
const token = req.headers['authorization'].split(" ")[1]
// console.log(token);
if (token) {
    try {
        const jwtResponse = jwt.verify(token,process.env.JWTSECRET) 
        console.log(jwtResponse); 
        req.payload = jwtResponse.userMail
        req.role = jwtResponse.role
        if(jwtResponse.role =="admin"){
        next()  

        }else{
            res.status(401).json("Authorization failed!!!  invalid token")
        }
    }catch(error) {
      res.status(401).json("Authorization failed!!!  invalid token")  
    }
    
}else{
   res.status(401).json("Authorization failed!!!  invalid token")  

}



}


module.exports = adminMiddleware