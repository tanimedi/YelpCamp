if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61664239a37d9ddc42df5905",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem odio iusto ut nulla ducimus saepe hic quisquam tenetur consequuntur! Odio dolore adipisci ullam neque assumenda illo doloremque autem magni amet.",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/dxgopufwf/image/upload/v1634150736/YelpCamp/day_f9eofn.jpg",
          filename: "YelpCamp/z8wpjuwydz0xjnll06gb"
        },
        {
          url:
            "https://res.cloudinary.com/dxgopufwf/image/upload/v1634150736/YelpCamp/night_exu6j4.jpg",
          filename: "YelpCamp/e4y30ikbqtpxbzsmnsa7"
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
