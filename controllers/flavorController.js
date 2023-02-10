const express = require("express");
const router = express.Router();
const { Flavor } = require("../models");

router.get("/", async (req, res) => {
  try {
    const flavors = await Flavor.findAll();
    // to include love and hate counts, uncomment this section
//    const withCounts = []
//     for (let i = 0; i < flavors.length; i++) {
//         const flavorObj = flavors[i];
//         const flavCounts = {
//             ...flavorObj.toJSON(),
//             numLoves:await flavorObj.countLovedBy(),
//             numHates:await flavorObj.countHatedBy()
//         }
//         withCounts.push(flavCounts)
//     }
//      res.json(withCounts);
res.json(flavors)
  } catch (err) {
    console.log(err);
    res.json({
      msg: "whoops",
      err,
    });
  }
});

module.exports = router;
