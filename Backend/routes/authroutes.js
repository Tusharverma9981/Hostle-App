const express = require('express')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User.model');

require("dotenv").config();

const router = express.Router();

router.post("/register",async (req,res)=>{
    try {
        const {name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message:"User already exists"})
        }

        const hashedpassword = await bycrypt.hash(password,10);

        const use  = await User.create({
            name,
            email,
            password:hashedpassword,
            role
        });

        res.status(201).json({
            success:true,
            message:"User created succesfully"
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    };
});

router.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            res.status(400).json({message:"invalid email"})
        }

        const isMatch = await bycrypt.compare(password,user.password);
        if (!isMatch) {
            res.status(400).json({message:"invalid password"})
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.status(200).json({
            success:true,
            message:"User logged in succesfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                role:user.role
            }
        });


    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

module.exports = router;