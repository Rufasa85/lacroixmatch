const sequelize = require("../config/connection");
const { User, Flavor } = require("../models");

const flavorSeeds = require("./lacroix.json")

const seed = async ()=>{
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            username:"singleJoe",
            email:"joe@joe.joe",
            password:"password",
            bio:"looking for la croix based love!"
        },
        {
            username:"shiva",
            email:"shiva@joe.joe",
            password:"meowmeow",
            bio:"Im not allowed people drinks!"
        },
        {
            username:"Bahamut",
            email:"bh@joe.joe",
            password:"chirpchirp",
            bio:"I am a strong independent cat who is happy alone"
        }
    ],{
        individualHooks:true
    })
    const flavors = await Flavor.bulkCreate(flavorSeeds);

    process.exit(1)
}

seed();