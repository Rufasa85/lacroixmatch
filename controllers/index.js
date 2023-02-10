const express = require('express');
const router = express.Router();
const userRoutes = require("./userController");
const flavorRoutes = require("./flavorController");
const frontEndRoutes = require("./frontEndController");

router.get("/sessionData",(req,res)=>res.json(req.session))

router.use("/api/flavors",flavorRoutes)
router.use("/api/users",userRoutes)
router.use("/",frontEndRoutes)

module.exports = router;