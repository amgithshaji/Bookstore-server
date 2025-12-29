const books = require('../models/bookModel');
const book = require('../models/bookModel')
// add book
exports.addBookController = async (req,res)=>{
console.log(" Inside addBookController");
// get book detials from req body
console.log(req.body);

const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category} = req.body
const uploadImages = req.files.map(item=>item.filename)
const sellerMail = req.payload
console.log(title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail);
try {
    // check book aleady exist
    const existingBook = await books.findOne({title,sellerMail})
    if (existingBook) {
        res.status(401).json("uploaded book already exists...")
    }else{
        const newBook = await books.create({
            title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail
        })
        res.status(200).json(newBook)
    }
    
} catch (error) {
    console.log(error);
    res.status(500).json(error)
    
}
}

// get home books- guest user
exports.getHomePageBooksController = async (req,res)=>{
console.log("inside getHomePageBookController");
  try {
    //get newly added 4 books from db
    const homeBooks = await books.find().sort({_id:-1}).limit(4)
    res.status(200).json(homeBooks) 
  } catch(error){
    console.log(error);
    res.status(500).json(error)  
  }

}



// get all books - user
exports.getuserAllBooksController = async (req,res)=>{
console.log("inside getuserAllBooksController");
// get qury from req
const searchKey = req.query.search
console.log(searchKey);

// get login user mail from token
const loginUsermail = req.payload
  try {
    //get all books from db expect logginded user uploaded books,bcoz logginded user doesn't need to see his books in all books 
    const allBooks = await books.find({sellerMail:{$ne:loginUsermail},title:{$regex:searchKey,$options:'i'}})
    res.status(200).json(allBooks) 
  } catch(error){
    console.log(error);
    res.status(500).json(error)  
  }

}




// get all user uploaded books

exports.getuserUploadprofilePageBooksController = async (req,res)=>{
console.log("getuserUploadprofilePageBooksController");
// get login user mail from token
const loginUsermail = req.payload
  try {
    //get books from db that is uploaded just by this loginded user
    const allUserBooks = await books.find({sellerMail:loginUsermail})
    res.status(200).json(allUserBooks) 
  } catch(error){
    console.log(error);
    res.status(500).json(error)  
  }

}



// get all user brought books

exports.getuserBroughtBookProfilePageController = async (req,res)=>{
console.log("getuserBroughtBookProfilePageController");
// get login user mail from token
const loginUsermail = req.payload
  try {
    //get all books....
    const allUserPurchaseBooks = await books.find({buyerMail:loginUsermail})
    res.status(200).json(allUserPurchaseBooks) 
  } catch(error){
    console.log(error);
    res.status(500).json(error)  
  }

}


// view a book

exports.viewBookController = async (req,res)=>{
  console.log("inside viewbookController");
  // get id from req
  const {id} = req.params
  // get book details of given id from the db
  try {
    const bookDetails = await books.findById({_id:id})
    res.status(200).json(bookDetails)
  } catch(error){
    console.log(error);
    res.status(500).json(error)
    
  }
  
}

// get all books - admin: login user


exports.getAllBooksController = async (req,res)=>{
  console.log("inside getuserAllBooksController");
  try {
    // get all books from db
    const allBooks = await books.find()
    res.status(200).json(allBooks)
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
  }
}