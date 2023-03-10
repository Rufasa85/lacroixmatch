const express = require("express");
const router = express.Router();
const { User, Flavor } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  User.findAll()
    .then((usersArr) => {
      res.json(usersArr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "whoopsie daisy",
        err,
      });
    });
});
router.get("/matchpercent/:matchId", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ msg: "login to view comaptability!" });
  }
  const myProfile = await User.findByPk(req.session.userId, {
    include: [
      {
        model: Flavor,
        as: "Love",
      },
      {
        model: Flavor,
        as: "Hate",
      },
    ],
  });
  const matchProfile = await User.findByPk(req.params.matchId, {
    include: [
      {
        model: Flavor,
        as: "Love",
      },
      {
        model: Flavor,
        as: "Hate",
      },
    ],
  });
  const myLikeIds = myProfile.Love.map(loveObj=>loveObj.id);
  const matchLikeIds = matchProfile.Love.map(loveObj=>loveObj.id);
  const sharedLikes = [];
  myLikeIds.forEach(like=>{
    if(matchLikeIds.includes(like)){
      if(!sharedLikes.includes(like))
      sharedLikes.push(like)
    }
  })
  const myDislikeIds = myProfile.Hate.map(hateObj=>hateObj.id);
  const matchDislikeIds = matchProfile.Hate.map(hateObj=>hateObj.id);
  const sharedDislikes = [];
  myDislikeIds.forEach(dislike=>{
    if(matchDislikeIds.includes(dislike)){
      if(!sharedDislikes.includes(dislike))
      sharedDislikes.push(dislike)
    }
  })
  const sharedLikePercentage = (sharedLikes.length/myLikeIds.length) *100
  const sharedDislikePercentage = (sharedDislikes.length/myDislikeIds.length) *100
 const totalCompat = ((sharedLikes.length + sharedDislikes.length)/(myLikeIds.length + myDislikeIds.length))*100

 //TODO: add a weighted percentage if =match hates a flavor you love 
  res.json({
    myLikeIds,
    matchLikeIds,
    sharedLikes,
    sharedLikePercentage,
    myDislikeIds,
    matchDislikeIds,
    sharedDislikes,
    sharedDislikePercentage,
    totalCompat
  })

});
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Flavor,
        as: "Love",
      },
      {
        model: Flavor,
        as: "Hate",
      },
    ],
  })
    .then((usersArr) => {
      res.json(usersArr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "whoopsie daisy",
        err,
      });
    });
});
//signup route
router.post("/", async (req, res) => {
  try {
    const userObj = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
    });
    await userObj.addLove(req.body.loveIds);
    await userObj.addHate(req.body.hateIds);
    req.session.userId = userObj.id;
    req.session.userData = {
      username: userObj.username,
      email: userObj.email,
    };
    req.session.loggedIn = true;
    res.json(userObj);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "whoopsie daisy",
      err,
    });
  }
});

router.put("/editprofile", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(403).json({ msg: "login first knuckleheads" });
  }
  User.update(
    {
      username: req.body.username,
      bio: req.body.bio,
    },
    {
      where: {
        id: req.session.userId,
      },
    }
  )
    .then((edited) => {
      res.json({
        msg: "edit complete!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "uh oh spagettiohs!",
        err,
      });
    });
});
//login route
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((userObj) => {
      if (!userObj) {
        return res.status(401).json({ msg: "invalid credentials" });
      }
      if (bcrypt.compareSync(req.body.password, userObj.password)) {
        req.session.userId = userObj.id;
        req.session.userData = {
          username: userObj.username,
          email: userObj.email,
        };
        req.session.loggedIn = true;

        return res.json(userObj);
      } else {
        return res.status(401).json({ msg: "invalid credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "whoopsie daisy",
        err,
      });
    });
});
router.delete("/logout", (req, res) => {
  req.session.destroy();
  res.send("logged out!");
});
//love route protecc
router.post("/addlove/:flavorId", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(403).json({ msg: "login first you knucklehead" });
    }
    const userObj = await User.findByPk(req.session.userId);
    await userObj.addLove(req.params.flavorId);
    return res.json({ msg: "flavor added to loves!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "flavor added already" });
  }
});

//unLove route protecc
router.delete("/removelove/:flavorId", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(403).json({ msg: "login first you knucklehead" });
    }
    const userObj = await User.findByPk(req.session.userId);
    await userObj.removeLove(req.params.flavorId);
    return res.json({ msg: "flavor removed to loves!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "flavor removed already" });
  }
});
//hate route protecc
router.post("/addhate/:flavorId", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(403).json({ msg: "login first you knucklehead" });
    }
    const userObj = await User.findByPk(req.session.userId);
    await userObj.addHate(req.params.flavorId);
    return res.json({ msg: "flavor added to hates!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "flavor added already" });
  }
});

//unHate route protecc
router.delete("/removehate/:flavorId", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(403).json({ msg: "login first you knucklehead" });
    }
    const userObj = await User.findByPk(req.session.userId);
    await userObj.removeHate(req.params.flavorId);
    return res.json({ msg: "flavor removed to hates!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "flavor removed already" });
  }
});

module.exports = router;
