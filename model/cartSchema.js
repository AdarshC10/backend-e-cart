//import mongoose
const mongoose = require('mongoose');

//define schema for wishlists collection to store data

const cartSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    grandTotal:{
        type:Number,
        required:true,
    }

   


})

//Create a model to store wishlist details
const carts = new mongoose.model('carts',cartSchema)

//Export model
module.exports = carts