const users = require('../models/userModel')

// register api request
exports.registerController = async (req,res)=>{
    console.log("inside registerController");
    const  {username,email,password} = req.body
    console.log(username,email,password);
    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if(existingUser){
                res.status(409).json("user already exist.... please login")
        }else{
            const newUser = new users({
            username,email,password

            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error)

    }
    
    // res.status(200).json("request recieved")
    
}
// login api
// usereditprofile
// admineditprofile