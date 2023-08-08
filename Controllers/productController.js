//logic to resolve



//import product collection
const products = require('../model/productSchema')


//get all product

exports.gelallproducts = async(req,res)=>{
    //logic
    try{
        //get all product from product collection in monbodb
        const allProducts =await products.find()
        res.status(200).json(allProducts)//response send back to the client

    }
    catch(err){
        res.status(401).json(err)//error sending back to the client
    }
}

//view particular product details
exports.viewproduct= async(req,res)=>{
    //logic
    //get particular product id
    const id = req.params.id //2
    //get the details of particular product
    try{
            //logic
            const product = await products.findOne({id})
            if(product){
                res.status(200).json(product)//product send back to the client
            }
            else{
                res.status(401).json("product not found")//error sending back to 
            }
    }
    catch(err){
        res.status(401).json(err)//error sending back to the
    }
}

