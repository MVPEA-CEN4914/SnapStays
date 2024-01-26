const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');

//set json as the default data type
app.use(express.json());

//connect to mongoose and mongo db. mongodb+srv://SnapStaysDev:CIS4914_SnapStays@snapstays.dpdpanv.mongodb.net/
mongoose.connect("mongodb+srv://SnapStaysDev:CIS4914_SnapStays@snapstays.dpdpanv.mongodb.net/SnapStays")



//define apis for user authentication
app.post("/api/register", async (req, res) => { 
    //missing get this information from the front end
    //missing validation and don't store password as plain text
    try{
        const user = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json( {status: "ok" });
    } catch(err){}

    res.json({ status: "ok" })
})
