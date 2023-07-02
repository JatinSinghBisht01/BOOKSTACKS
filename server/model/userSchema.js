 const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    books:[{
        bookname:{
            type:String,
            
        },
        author:{
            type:String,
           
        },
        isbn:{
            type:String,
            required:true,
            
        },
        issuedon:{
            type:Date,
            default:Date.now
        },
        returnedon:{
            type:Date,
        }
    }
    ],

    tokens:[
         { token:{
            type:String,
            required:true
         }

    }]

});

//storing message
userSchema.methods.addBook = async function (bookname, author, isbn) {
    try { 
        this.books = this.books.concat({bookname, author, isbn});
        await this.save();
        return this.books;
    } catch (error) {
        console.log(error);
    }
}


const User = mongoose.model("User", userSchema);

module.exports = User;