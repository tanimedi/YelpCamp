const mongoose = require('mongoose');
const cities =require('./cities');
const {places,descripptors}=require('./seedHelpers')
const Campground=require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
} );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB=async()=>{
    await Campground.deleteMany({});
    const c = new Campground({title:'purple field'});
    await c.save();
    for(let i=0; i<50; i++){
        const random1000=Math.floor(Math.random()*1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        })
        await camp.save();
    }
}

seedDB();