// register api request
exports.registerController = (req,res)=>{
    console.log("inside registerController");
    const  {username,email,password} = req.body
    console.log(username,email,password);
    
    res.status(200).json("request recieved")
    
}
// login api
// usereditprofile
// admineditprofile