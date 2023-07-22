const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt =require("bcryptjs");
const authenicate = require("../middleware/authenticate");



//get products data api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    //console.log("console the data"+productsdata)    
    
    res.status(201).json(productsdata)

  } catch (error) {
    console.log("error message" + error.message);

  }
});

//get individual data
router.get("/getproductsone/:id",async(req,res)=>{
  
  try{
    const {id} = req.params;
    // console.log(id);
  
    const individualdata = await Products.findOne({id:id})

    // console.log(individualdata + "individual data");

    res.status(201).json(individualdata);
    
  }

   catch (error){
    res.status(400).json(individualdata);
    console.log("error message" + error.message);

    }

})

//register data

router.post("/register",async(req,res)=>{
  // console.log(req.body);
const {fname,email,mobile,password,cpassword} = req.body;
  if(!fname  || !email  || !mobile || !password || !cpassword){
    res.status(422).json({ error: "fill the all details" });
        console.log("Data Unavailable");
  };


    const preuser = await User.findOne({ email : email });

    if (preuser) {
        res.status(422).json({ error: "This email is already present" });
    } else if (password !== cpassword) {
        res.status(422).json({ error: "Password and cpassword not match" });;
    } else {

        const finaluser = new User({
            fname, email, mobile, password, cpassword
        });

       //har sh -> encrypt:hujih ->> decrypt -> harsh
       //bcryptjs  
       //password hashing porcess

        // user ko add karna 
        const storedata = await finaluser.save();
        console.log(storedata + "User successfully Register");
        res.status(201).json(storedata);
    }



});

// login user api
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "fill all the details" });
  }

  try {
    const userlogin = await User.findOne({ email: email });
    if (userlogin) { 
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch +" pass match");

      //token generate
      const token = await userlogin.generatAuthtoken();
      console.log(token);
      
      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      if (!isMatch) {
         res.status(400).json({ error: "invalid details" });
      } else {
        res.status(201).json(userlogin)
        // const token = await userlogin.generatAuthtoken();
      }
    }else{
      res.status(400).json({ error: "invalid details" });
    }
    
  } catch (error) {
    // console.log("error at login time : " + error.message);
    return res.status(400).json({ error: "invalid details" });
  }
});

// adding the data into cart
router.post("/addcart/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    //got cart detail
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    //got user detail
    const Usercontact = await User.findOne({ _id: req.userID });   
    console.log(Usercontact);


    if (Usercontact) {
      //here we call addcartdata function which we defined into userSchema..
      const cartData = await Usercontact.addcartdata(cart);

      await Usercontact.save();
      console.log(cartData);
      res.status(201).json(Usercontact);
    }
    else{
      res.status(401).json({error:"invalid user"});
    }
  } catch (error) {
    // console.log(error);
    res.status(401).json({error:"invalid user"});  
  }
});

//get cart details
router.get("/cartdetails",authenicate,async(req,res) =>{
  try{
    const buyuser = await User.findOne({_id:req.userID});
    res.status(201).json(buyuser);
  }
  catch (error){
    console.log("error"+error)
  }
})

// get user valid
router.get("/validuser", authenicate, async (req, res) => {
  try {
      const validuser= await User.findOne({ _id: req.userID });
      res.status(201).json(validuser);
  } catch (error) {
      console.log(error + "error for valid user");
  }
});
// remove iteam from the cart 

router.delete("/remove/:id", authenicate, async (req, res) => {
  try {
      const { id } = req.params;

      req.rootUser.carts = req.rootUser.carts.filter((currval) => {
          return currval.id != id
      });

      req.rootUser.save();
      res.status(201).json(req.rootUser);
      console.log("item remove");
      //item removed here

  } catch (error) {
      console.log(error + "error");
      res.status(400).json(req.rootUser);
  }
});

// for userlogout

router.get("/logout", authenicate, async (req, res) => {
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
          return curelem.token !== req.token
      });

      res.clearCookie("Amazonweb", { path: "/" });
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");

  } catch (error) {
      console.log(error + "jwt provide then logout");
  }
});

module.exports = router;
