import PostMessage from '../models/postMessage.js'
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    const { page } = req.query;

    // res.send('this works')
    try{
        const LIMIT = 10;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error){
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async(req, res) => {

    const { searchQuery, tags } = req.query;

    try{
        const title = new RegExp(searchQuery, 'i'); // i = ignore case

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
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