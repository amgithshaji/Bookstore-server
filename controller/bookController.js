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

