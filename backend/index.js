const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = require('./models/user.model');

//set json as the default data type
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://SnapStaysDev:CIS4914_SnapStays@snapstays.dpdpanv.mongodb.net/SnapStays")

//define apis for user authentication
//missing get this information from the front end
//missing validation and don't store password as plain text
app.post("/api/register", async (req, res) => { 
    try{
        const user = await UserSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json( {status: "ok" });
    } catch(err){
        res.status().json({error: err})
    }
})

app.post("/api/login", async (req, res) => { 
    const user = await UserSchema.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user){
        //auth with jwt
        const token = jwt.sign(
            {
                //add any other information we would want to encrypt in the token
                email: user.email
            },
             "SnapStaysSecret"
        )
        return res.json({status: "ok" , user: true})
    }
    else{
        return res.json({status: "error", user: false})
    }
})

app.listen(1337, () => {
    console.log("Server started on port 1337")
})

