const express = require('express');
const router = express.Router();
const {User,Flavor} = require('../models');

router.get("/",(req,res)=>{
    res.render("home",{
        isLoggedIn:req.session.loggedIn,
        userId:req.session.userId,
    })
})

// login page
router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        return res.redirect("/")
    }
    res.render("login",{
        isLoggedIn:req.session.loggedIn,
        userId:req.session.userId,
    })
})
// signup page
router.get("/signup",(req,res)=>{
    if(req.session.loggedIn){
        return res.redirect("/")
    }
    Flavor.findAll().then(flavors=>{
        const hbsFlavors = flavors.map(flavObj=>flavObj.toJSON());
        console.log(hbsFlavors)
        res.render("signup",{
            isLoggedIn:req.session.loggedIn,
            userId:req.session.userId,
            flavors:hbsFlavors
        })
    })
})
//TODO: profile page

router.get("/user/:id",async (req,res)=>{
    try {

    
   const userData = await User.findByPk(req.params.id,{
        include:[
            {
                model:Flavor,
                as:"Love"
            },
            {
                model:Flavor,
                as:"Hate"
            }
        ]
    })
    const flavorArr = await Flavor.findAll();
    const hbsUser = userData.toJSON();
    const hbsFlavors = flavorArr.map(flavorObj=>flavorObj.toJSON())

      res.render("profile",{
        isLoggedIn:req.session.loggedIn,
        userId:req.session.userId,
        isMyProfile: req.params.id== req.session.userId,
        flavors:hbsFlavors,
        user:hbsUser
      })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"oh no",err})
    }
 
})

module.exports = router;