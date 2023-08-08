//import cartschema
const carts= require('../model/cartSchema')

//add to cart
exports.addtocart=async(req,res)=>{
    //get product details from request
    const{id,title,price,image,quantity}= req.body

    try{
   //check is the product is already in cart then the quantity and price
    const product =await carts.findOne({id})
    if(product){
      //if product is already in cart, increment the quantity
      product.quantity+=1
      //update grand total
      product.grandTotal=product.price*product.quantity
      //save the changes into db
      product.save()
      //send response back to the client
      res.status(200).json("item updated...") 


    }
     else{
        //else product not in the cart ,add to cart
        const newProduct = new carts({
            id,title,price,image,quantity,grandTotal:price
        })
        //save new product
        await newProduct.save()
        //response send back to the client
        res.status(200).json("Item added to your cart")
     }
    }
    catch(error){
        res.status(401).json(error)

    }

   
}

//get cart items
exports.getcart=async(req,res)=>{
    try{
        const allcartItems =await carts.find()
        //response send back to client
        res.status(200).json( allcartItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}
//cart delete
exports.delete=async(req,res)=>{
    //remove cart items
    //get product id from parameter
    const {id}= req.params
    try{
        const removecartitems =await carts.deleteOne({id})
        if(removecartitems.deleteCount!=0){
            //get all cart items after removing particular cart item
            const allcartItems =await carts.find()
            res.status(200).json(allcartItems)
        }
    }
    catch(error){
        res.status(401).json(error)
    }

}
//increment cart items
exports.incrementCartItems= async(req,res)=>{
    //get product id from request
    const {id}=req.params
    try{
            //check if product present in the cart
            const product = await carts.findOne({id})
            if(product){
                //update the quantity and grand total
                product.quantity+=1
                product.grandTotal=product.quantity*product.price
             

                //save changes into db
                await product.save()
                //updated details send back to the client
                const allcartItems =await carts.find()
                //response send back to client
                res.status(200).json( allcartItems)
            }
            else{
                res.status(404).json("product not found")
            }
    }
    catch(error)
    {
        res.status(404).json(error)
    }
}

//decrement cart items
exports.decrementCartItems= async(req,res)=>{
    //get product id from request
    const {id}=req.params
    try{
            //check if product present in the cart
            const product = await carts.findOne({id})
            if(product){
                //update the quantity and grand total
                product.quantity-=1
              

                if(product.quantity ==0){
                    //remove the product from the cART
                    const removecartitem =await carts.deleteOne({id})
                    const allcartItems =await carts.find()
                    res.status(200).json(allcartItems)
                }
              
             
                else{
                    product.grandTotal=product.quantity * product.price
                     //save changes into db
                await product.save()
                //updated details send back to the client
                const allcartItems =await carts.find()
                //response send back to client
                res.status(200).json( allcartItems)
                }
               
            }
            else{
                res.status(404).json("product not found")
            }
    }
    catch(error)
    {
        res.status(404).json(error)
    }
}