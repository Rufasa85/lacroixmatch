const express = require("express");
const router = express.Router();
const { Flavor } = require("../models");

router.get("/", async (req, res) => {
  try {
    const flavors = await Flavor.findAll();
    // const withLoveAndHateCounts = await flavors.map(async (flavorObj)=>{
        
    //    flavorObj.numLoves = await flavorObj.countLovedBy();
    //    flavorObj.numHates = await flavorObj.countHatedBy();
    //    console.log(flavorObj)
    //    return flavorObj.toJSON()
    // })
    // console.log(withLoveAndHateCounts)
    res.json(flavors);
  } catch (err) {
    console.log(err);
    res.json({
      msg: "whoops",
      err,
    });
  }
});

module.exports = router;
