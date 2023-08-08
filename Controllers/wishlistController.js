
//import wishlistSchema
const wishlists =require('../model/wishlistSchema')

//logic for wishlist
//add product to wishlist
exports.addtowishlist=async(req,res)=>{
    //gat specfic product details from the request

    // Js destructring

    // req.body={
    //     "id":"123",
    //     "title":"backspace",
    //     "price":"1222",
    // }
   //!using javascript destructring
   const {id,title,price,image} = req.body

   //ligic for wishlist
   try{
        //check the product in wishlist
        const item = await wishlists.findOne({id})
        if(item){
            res.status(401).json("item already in wishlist")
        }
        else{
            //product added to the wishlist
                const newProduct =await wishlists({id,title,price,image})
                //store in db
                await newProduct.save()
                res.status(200).json("item added to wishlist")
        }

   }
   catch(error){
            res.status(404).json(error)
   }

}

//get wishlist products from db
exports.getwishlist=async(req,res)=>{
    try{
        //logic
        //get all products from wishlist
        const allwishlist = await wishlists.find()
        res.status(200).json(allwishlist)//response send back to client

    }
    catch(error){
        res.status(404),json(error)
    }
}

//delete the wishlist product from db
exports.deletewishlist = async(req,res)=>{
    //get particular iproduct id
    const {id} =req.params
    try{

        //logic
        const removewishlist =await wishlists.deleteOne({id})
        if(removewishlist){
            //get all wishlist  product after the removing particular product
            const remainingwishlist=await wishlists.find()
            res.status(200).json(remainingwishlist)//response  back to the client
        }
        
    }
    catch(error){
        res.status(404).json(error)
    }
}