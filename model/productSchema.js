//import mongoose
const mongoose = require('mongoose');

//define schema for products collection to store data

const productSchema =new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    rating:{
        rate:{
            type:Number,
            required:true,
        },
        count:{
            type:Number,
            required:true,
        }
    },
    image:{
        type:String,
        required:true
    }


})

//Create a model to store product details
const products = new mongoose.model('products',productSchema)

//Export model
module.exports = products