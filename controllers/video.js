const User = require('../models/User');
const Video = require('../models/Video');
const {createError} = require("../utils/error");

const random = async (req,res,next)=>{
    try{
        const videos = await Video.aggregate([{$sample:{size:38}}]);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

uploadVideo = async (req,res,next)=>{
    const newVideo = new Video({userId: req.user._id, ...req.body});
    try{
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    }catch(err){
        next(err);
    }
}

const updateVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video)
            return next(createError(404, "Video not found"));
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,                 
                {
                $set: req.body,
                }, {new: true});
            res.status(200).json(updatedVideo);
        }else{
            return next(createError(403, "You can only updtae your video!"));
        }
    }catch(err){
        next(err);
    }
}

const deleteVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video)
            return next(createError(404, "Video not found"));
        if(req.user._id === video.userId){
            await Video.findByIdAndDelete(
                req.params.id,                 
               );
            res.status(200).json("The video has been deleted");
        }else{
            return next(createError(403, "You can only delete your video!"));
        }
    }catch(err){
        next(err);
    }
}

const getVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }catch(err){
        next(err);
    }
}

const trends = async (req,res,next)=>{
    try{
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

const addView = async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("The view has been increased");
    }catch(err){
        next(err);
    }
}

const sub = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId:channelId});
            }));
            res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
    }catch(err){
        next(err);
    }
}

const getByTag = async (req,res,next)=>{
    const tags = req.query.tags.split(",");
    try{
        const videos = await Video.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

const search = async (req,res,next)=>{
    const query = req.query.q;
    try{
        const videos = await Video.find({
            title: {$regex: query, $options: "i"},
        }).limit(40);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}
module.exports = {
    random, search, sub, trends, addView, getVideo, deleteVideo, updateVideo, uploadVideo, getByTag
}