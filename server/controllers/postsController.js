import PostMessage from '../models/postMessage.js'
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    // res.send('this works')
    try{
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error){
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    // res.send('post creation here')
    const body = req.body;

    const newPost = new PostMessage({
        ...body,
        isPublic: body.isPublic ?? true, // fallback true
        creator: req.userId,
        createdAt: new Date().toISOString()
    });

    try{
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    //check id in mongoose
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id');

    await PostMessage.findByIdAndDelete(id);

    res.json({message:'Post deleted successfully.'});


}

export const likePost = async (req, res) => {

    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated user' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        // like the post
        post.likes.push(req.userId);
    } else {
        //dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

    res.json(updatedPost);
}