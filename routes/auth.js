const router = require('express').Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt =require( 'bcryptjs');
const {createError} = require('../utils/createError');
// const {verifyToken} = require('../utils/verifyToken');
router.post('/signup', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            res.status(404).send("Email Exit!") 
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});

        await newUser.save();
        res.status(200).json("User has been created!");
    }catch(err){
        next(err);
    }  
});

router.post('/login', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).send("User not Found!");
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            res.status(404).send("Invalid Credentials!");
        }
        const token = jwt.sign({_id: user._id}, `${process.env.JWT_SECRET}`);
        const {password , ...userWithoutPassword} = user.toObject();
        res
        .cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json(userWithoutPassword);
     }catch(err){
        next(err);
    }  
})
router.post('/googleauth',async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({_id: user._id},`${process.env.JWT_SECRET}`);
            res
            .cookie("access_token", token, {
                httpOnly: true
            })
            .status(200)
            .json(user._doc);
        }else{
            const newUser = new User({...req.body,
            fromGoogle: true,
            })
           const savedUser = await newUser.save(); 
           const token = jwt.sign({_id: savedUser._id}, `${process.env.JWT_SECRET}`);
           res
           .cookie("access_token", token, {
               httpOnly: true
           })
           .status(200)
           .json(savedUser._doc);
        }
}catch(err){
    next(err);
}});

module.exports = router;