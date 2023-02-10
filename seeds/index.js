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
    await flavors[3].addLovedBy(2);
    await users[0].addLove([2,3,6,7])
    await users[0].removeLove(3);

    await users[0].addHate([29,13,1])
    const finalresult = await User.findByPk(1,{
        include:[{
            model:Flavor,
            as:"Love"
        },{
            model:Flavor,
            as:"Hate"
        }]
    })
    console.log(finalresult.toJSON())
    process.exit(1)
}

seed();