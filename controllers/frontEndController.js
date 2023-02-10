const express = require('express');
const router = express.Router();
const {User,Flavor} = require('../models');

router.get("/",(req,res)=>{
    res.render("home",{
        isLoggedIn:req.session.loggedIn
    })
})

//TODO: login page
router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        return res.redirect("/")
    }
    res.render("login",{
        isLoggedIn:req.session.loggedIn
    })
})
//TODO: signup page
router.get("/signup",(req,res)=>{
    if(req.session.loggedIn){
        return res.redirect("/")
    }
    Flavor.findAll().then(flavors=>{
        const hbsFlavors = flavors.map(flavObj=>flavObj.toJSON());
        console.log(hbsFlavors)
        res.render("signup",{
            isLoggedIn:req.session.loggedIn,
            flavors:hbsFlavors
        })
    })
})
//TODO: profile page

module.exports = router;