const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then((res)=>{
    console.log("db is connected");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
}

// home route
app.get("/", (req, res)=>{
    res.send("Listening to root")
})

// listing route
app.get("/listing", async(req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

// new route
app.get("/listing/new", (req, res) => {
    res.render("listings/new");
})


// show route
app.get("/listing/:id", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
})

// show route
// app.get("/listing/:id", async(req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);

//     console.log(listing);

//     res.render("listings/show", {listing});
// });

// create route
app.post("/listing", async(req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing")
})

// edit route
app.get("/listing/:id/edit", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
})

// update route
app.put("/listing/:id", async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listing/${id}`);
})

// delete route
app.delete("/listing/:id", async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");
})


// testListing route
// app.get("/testListing", async(req, res)=>{
//     let sampleListing = new Listing({
//         title: "My new villa",
//         discription: "By the beach",
//         price: 1200,
//         location: "calangute, Goa",
//         country: "India" 
//     })

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Sample was saved");
// })

app.listen(8080, ()=>{
    console.log("Perfectly working")
})