const User = require("./User");
const Flavor = require("./Flavor");

User.belongsToMany(Flavor,{
    through:"LovedFlavors",
    as:"Love"
});
Flavor.belongsToMany(User,{
    through:"LovedFlavors",
    as:"LovedBy"
});
User.belongsToMany(Flavor,{
    through:"HatedFlavors",
    as:"Hate"
});
Flavor.belongsToMany(User,{
    through:"HatedFlavors",
    as:"HatedBy"
});

module.exports = {
    User,
    Flavor
}