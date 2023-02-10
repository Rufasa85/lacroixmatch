const User = require("./User");
const Flavor = require("./Flavor");

User.belongsToMany(Flavor,{
    through:"UserFlavor"
});
Flavor.belongsToMany(User,{
    through:"UserFlavor"
});

module.exports = {
    User,
    Flavor
}