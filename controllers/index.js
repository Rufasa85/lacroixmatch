const express = require('express');
const router = express.Router();
const userRoutes = require("./userController");

router.get("/",(req,res)=>{
    res.send("this is the hp")
})

router.get("/sessionData",(req,res)=>res.json(req.session))

router.use("/api/users",userRoutes)

module.exports = router;