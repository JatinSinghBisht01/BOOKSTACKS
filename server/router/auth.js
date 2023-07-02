const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../db/conn");
const User = require("../model/userSchema");
const cookieParser = require('cookie-parser');
const Authenticate = require("../middleware/authenticate");

router.use(cookieParser());


router.post("/api/auth/register", (req, res)=>{
  
  bcrypt.hash(req.body.password, 12, function (err, hash) { 
    const newUser = new User({
      username:req.body.username,
      password: hash,
      cpassword: hash,
      
    });
   
    if(!newUser.username || !newUser.password || !newUser.cpassword){
      return res.status(422).json({error: "Plz fill the required field"});
    }
    User.findOne({username: newUser.username}, function (err, userExist) { 
      if(err){
        console.log(err);
        return res.status(500).json({error: "failed to register"});
      }else{
        if(userExist){
          return res.status(400).json({error: "username already Exist, take a new username"});
        }else{
          if(req.body.password === req.body.cpassword){
           // Create token
              const username = req.body.username;
              const token = jwt.sign(
                { user_id: newUser._id, username },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "720h",
                
                }
              );
              newUser.tokens = newUser.tokens.concat({token: token});
              // res.status(201).json(newUser);
              console.log(newUser);
              newUser.save();
              return res.status(201).json({success: "user registered succesfully"});
          }
          else{
            return res.status(422).json({error: "Password and Confirm password field don't match"});
          }
        }
      }
     });

   });
  });

  //LOgin route
  router.post("/api/auth/signin", (req, res)=>{
    if(!req.body.username || !req.body.password){
      return res.status(400).json({error: "Plz fill the required data"});
   }else{
      User.findOne({username: req.body.username}, function (err, foundUser) {
        if(err){
          console.log(err);
        }else{
          if(foundUser){
             bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                  if(result){
                    return res.status(201).json({success: "successfully log in"})
                  }else{
                    return res.status(400).json({message: "incorrect password"});
                  }
              });
              const username = req.body.username;
              const token = jwt.sign(
                { user_id: foundUser._id, username },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "720h",
                }
              );
              foundUser.tokens = foundUser.tokens.concat({token: token});
              foundUser.save();
              
               res.cookie("jwt", token, {
                maxAge: 600000,  // 10 mins for testing(1000 is factor)
                httpOnly: true,
                sameSite: false,  //false only for dev
                secure: true,   //false only for dev
            })
              
          }else{
            return res.status(404).json({message: "user not found"});
          };
        }
      })

  }
  });

  // Protected route
    router.get('/api/protected', Authenticate, (req, res) => {
      res.json({ message: 'Protected route accessed successfully' });
    });


  router.get("/api/user/borrowed-books", Authenticate, function (req, res) {
    console.log("books list");
    const books = req.user.books;
    res.send(books);
  });

//book-borrow
  router.post("/api/user/borrow", Authenticate, async  (req, res) =>{
    try {
      const {bookname, author, isbn} = req.body;
      const user =  await User.findOne({_id: req.userID});

      if(user){
        const existingBook = user.books.find(book => book.isbn === isbn);

      if (existingBook) {
        return res.status(409).json({ error: "Book already exists" });
      }
        const bookBorrowed = await user.addBook(bookname, author, isbn);
        await user.save();
        res.status(201).json({success:"Book added to bookshelf"});
      }
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  });

  //book-return
  router.post("/api/user/return", Authenticate, async (req, res) => {
    try {
      const { bookname, isbn } = req.body;
      const user = await User.findOne({ _id: req.userID });
  
      if (user) {
        const existingBook = user.books.find(
          (book) => book.isbn === isbn && book.bookname === bookname
        );
  
        if (!existingBook) {
          return res.status(404).json({ error: "Book not found" });
        }
  
        existingBook.returnedon = Date.now(); // Update issuedon to current date
  
        await user.save();
        res.status(200).json({ success: "Book returned successfully" });
      }
    } catch (error) {
      res.status(400).json({ error: "An error occurred" });
      console.log(error);
    }
  });

  //most-preffered book
  router.get('/api/books/top', async (req, res) => {
    try {
      const users = await User.find({});
      const bookCounts = {};
  
      // Count the occurrence of each book
      users.forEach((user) => {
        user.books.forEach((book) => {
          const bookName = book.bookname;
          if (bookCounts[bookName]) {
            bookCounts[bookName] += 1;
          } else {
            bookCounts[bookName] = 1;
          }
        });
      });
      console.log(bookCounts)
  
      // Sort the books by count in descending order
      const sortedBooks = Object.keys(bookCounts).sort(
        (a, b) => bookCounts[b] - bookCounts[a]
      ).map(bookName =>({bookName, count: bookCounts[bookName]}));
  
      // Get the top 10 books
      const topBooks = sortedBooks.slice(0, 5);
      console.log(topBooks)
  
      res.status(200).json({ topBooks });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(error);
    }
  });

  
   //logout page
   router.get("/api/user/logout", function (req, res) {
    console.log("logout running");
    res.clearCookie("jwt", {path:"/"});
    res.status(200).send("User logout");
  });

module.exports = router;