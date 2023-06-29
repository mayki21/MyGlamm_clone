const express=require("express")
const jwt=require("jsonwebtoken")
const cartroute=express.Router()
const cartmodel=require("../model/cartmodel")
const lipstickmodel = require("../model/lipstickmodel")
const makeupmodel = require("../model/makeupmodel")
const skincaremodel = require("../model/skincaremodel")



cartroute.get("/",async (req,res)=>{
  try {
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"kiran")
      const data = await cartmodel.findOne({"userID":decoded.userID}).populate("lipsticks.data").populate("makeups.data").populate("skincares.data");
      res.status(200).send(data)
  } catch (error) {

    res.status(400).send({"msg":error.message})
    
  }
  
})

cartroute.post("/post",async (req,res)=>{
      try {
        const data=new cartmodel(req.body)
        await data.save()
        res.status(200).send({"msg":"posted data successfully"})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})



cartroute.patch("/inc/:itemId", async (req, res) => {
  try {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "kiran");
    const cart = await cartmodel.findOne({userID:decoded.userID});
  
    if (!cart) {
      return res.status(404).send({ "msg": "Cart Not Found" });
    }
  
    const itemId = req.params.itemId;
    let item = null;
  
    // Search for the item within sales
    item = cart.lipsticks.find((ele) => ele._id.equals(itemId));
  
    // If the item is not found within sales, search within fleeces
    if (!item) {
      item = cart.makeups.find((ele) => ele._id.equals(itemId));
    }
  
    // If the item is not found within fleeces, search within rains
    if (!item) {
      item = cart.skincares.find((ele) => ele._id.equals(itemId));
    }
  
    if (!item) {
      return res.status(404).send({ "msg": "Item Not Found in Cart" });
    }
  
    item.Quantity += 1;
    await cart.save();
  
    res.status(200).send({ "msg": "Quantity Increased Successfully" });
  } catch (error) {
    res.status(400).send({ "msg": error.message });
  }
  
  


})

cartroute.patch("/dec/:itemId", async (req, res) => {
  try {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "kiran");
    const cart = await cartmodel.findOne({userID:decoded.userID});
  
    if (!cart) {
      return res.status(404).send({ "msg": "Cart Not Found" });
    }
  
    const itemId = req.params.itemId;
    let item = null;
  
    // Search for the item within sales
    item = cart.lipsticks.find((ele) => ele._id.equals(itemId));
  
    // If the item is not found within sales, search within fleeces
    if (!item) {
      item = cart.makeups.find((ele) => ele._id.equals(itemId));
    }
  
    // If the item is not found within fleeces, search within rains
    if (!item) {
      item = cart.skincares.find((ele) => ele._id.equals(itemId));
    }
  
    if (!item) {
      return res.status(404).send({ "msg": "Item Not Found in Cart" });
    }
  
    item.Quantity -= 1;
    await cart.save();
  
    res.status(200).send({ "msg": "Quantity Increased Successfully" });
  } catch (error) {
    res.status(400).send({ "msg": error.message });
  }
  
  


})



cartroute.delete("/delete/:itemId",async (req,res)=>{
  try {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "kiran");
    const cartId = req.params.id;
    const cart = await cartmodel.findOne({userID:decoded.userID});
  
    if (!cart) {
      return res.status(404).send({ "msg": "Cart Not Found" });
    }
  
    const itemId = req.params.itemId;
  
    let itemArray = null;
  
    // Find the item in the lipsticks array
    let itemIndex = cart.lipsticks.findIndex((item) => item.data._id.equals(itemId));
    if (itemIndex !== -1) {
      itemArray = cart.lipsticks;
    }
  
    // Find the item in the makeups array
    if (itemIndex === -1) {
      itemIndex = cart.makeups.findIndex((item) => item.data._id.equals(itemId));
      if (itemIndex !== -1) {
        itemArray = cart.makeups;
      }
    }
  
    // Find the item in the  skincares array
    if (itemIndex === -1) {
      itemIndex = cart.skincares.findIndex((item) => item.data._id.equals(itemId));
      if (itemIndex !== -1) {
        itemArray = cart.skincares;
      }
    }
  
    if (itemIndex === -1) {
      return res.status(404).send({ "msg": "Item Not Found in Cart" });
    }
  
    // Remove the item from the item array
    itemArray.splice(itemIndex, 1);
    await cart.save();
  console.log("hi")
    res.status(200).send({ "msg": "Item Removed Successfully" });
  } catch (error) {
    res.status(400).send({ "msg": error.message });
  }
  
  
  
})





cartroute.delete("/delete/:id",async (req,res)=>{
  const {id}=req.params
  const data=await cartmodel.findByIdAndDelete({_id:id})
  console.log(data)
  res.status(200).send({"msg":"Data updated",data:data})
})


cartroute.post("/lipstick/:id", async (req, res) => {
  const token = req.headers.authorization
  const decoded = jwt.verify(token, "kiran");
  const lipstickid = req.params.id;
  try {
    let cart = await cartmodel.findOne({ userID: decoded.userID });

    const lipstick = await lipstickmodel.findById(lipstickid);

    if (!cart) {
      cart = new cartmodel({ userID: decoded.userID, data: [] });
    }
    if (!lipstick) {
      return res.status(404).send({ "msg": "lipstick Not Found In DB" });
    }

    const islipstickInCart = cart.lipsticks.some((ele) => ele.data.equals(lipstick._id));

    if (islipstickInCart) {
      return res.status(404).send({ "msg": "Product Already in the Cart" });
    }

    cart.lipsticks.push({ data: lipstickid, quantity: 1 });
    await cart.save();
    res.status(200).send({ "msg": "Product Added To Cart" });
  } catch (error) {
    res.status(400).send({ "msg": error.message });
  }


})
// for makeup
cartroute.post("/makeup/:id", async (req, res) => {
 
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "kiran");
  const makeupid = req.params.id;
  try {
    let cart = await cartmodel.findOne({ userID: decoded.userID });

    const makeup = await makeupmodel.findById(makeupid);

    if (!cart) {
      cart = new cartmodel({ userID: decoded.userID, data: [] });
    }
    if (!makeup) {
      return res.status(404).send({ "msg": "product Not Found In DB" });
    }

    const isMakeupInCart = cart.makeups.some((ele) => ele.data.equals(makeup._id));

    if (isMakeupInCart) {
      return res.status(404).send({ "msg": "Product Already in the Cart" });
    }

    cart.makeups.push({ data: makeupid, quantity: 1 });
    await cart.save();
    res.status(200).send({ "msg": "Product Added To Cart" });
  } catch (error) {
    res.status(400).send({ "msg": error.message });
  }
})



//  for skincare 
cartroute.post("/skincare/:id", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token,"kiran")
  const skincareid = req.params.id
  try {
    let cart = await cartmodel.findOne({userID:decoded.userID})


    const skincare=await skincaremodel.findById(skincareid)

    if (!cart) {
      cart = new cartmodel({userID: decoded.userID})
    }
    if (!skincare) {
      return res.status(404).send({ "msg": "skincare product Not Found In DB" })
    }

    const isskincareInCart = cart.skincares.some((ele) =>
      ele.data.equals(skincare._id)
    )

    if (isskincareInCart) {
      return res.status(404).send({"msg":"Product Already in the Cart"})
    }

    // cart.skincares.push(skincareid)
    cart.skincares.push({ data: skincareid, quantity: 1 });
    await cart.save()
    res.status(200).send({ "msg": "Product Added To Cart" })



  } catch (error) {
    res.status(400).send({ "msg": error.message })

  }
})





module.exports=cartroute