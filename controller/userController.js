const users = require('../models/userModel')
// 
const jwt = require('jsonwebtoken')
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
 exports.logincontroller = async (req,res)=>{
    console.log("inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if (existingUser) {
            if(password == existingUser.password){
                // generate token
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }else{
                res.status(401).json("incorrect email / password")
            }
            
        }else{
            res.status(404).json("account doesnot exists!!")
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
 }
//  google login
 exports.googleLoginController = async (req,res)=>{
    console.log("inside googleLoginController");
    const {email,password,username,picture} = req.body
    console.log(email,password,username,picture);
    try{
    //  check mail model
    const existingUser = await users.findOne({email})
    if (existingUser) {
        // login
        // generate token
        const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
        res.status(200).json({user:existingUser,token})
    }else{
        // register
        const newUser = await users.create({
            username,email,password,picture
        })
        const token = jwt.sign({userMail:newUser.email,role:newUser.role},process.env.JWTSECRET)
        res.status(200).json({user:newUser,token})
    }

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
 }
// usereditprofile
exports.updateUserProfileController = async (req,res)=>{
console.log("inside updateUserProfileController");
// get id from req url
const {id} = req.params
// get email
const email = req.payload
// get body text content : username
const {username,password,bio,role,picture} = req.body
// get file data
const uploadImage = req.file?req.file.filename:picture
console.log(id,email,username,password,bio,role,uploadImage);
try {
    const updateUser = await users.findByIdAndUpdate({_id:id},{
        username,email,password,picture:uploadImage,bio,role
    },{new:true})
    res.status(200).json(updateUser)
} catch(error) {
    console.log(error);
    res.status(500).json(error)
    
}
}
// admineditprofile