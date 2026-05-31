const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then(async () => {
    console.log("db is connected");
    await initDB();
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
}

const initDB = async()=>{
    await Listing.deleteMany();
    await Listing.insertMany(data.data);
    console.log("Data was initialised");
}

