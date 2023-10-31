const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST")
const requireLogin = require("../middleware/requireLogin");

// Route for all posts on the feed
router.get("/allposts", requireLogin, (req, res) => {
    let limit = req.query.limit
    let skip = req.query.skip
    // console.log(limit)
    POST.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    // .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log("allposts route err: ",err))
})

// Route for create post
router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    // console.log(pic)
    if(!body || !pic ) {
        return res.status(422).json({error:"Please fill all the field"})
    }
    // console.log(req.user)

    const post = new POST({
        body,
        photo:pic,
        postedBy: req.user
    })
    post.save().then((result)=>{
        // res.json("OK!")
        return res.json({post: result})
    })
    // .populate("postedBy","name")
    .catch(err=> console.log(err))
})

// Route for getting my post
router.get("/myposts",requireLogin, (req, res)=>{
    POST.find({postedBy: req.user._id})
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .then(myposts => {
            res.json(myposts)
    })
})

// Route to store userid for image like
router.put("/like", requireLogin, (req, res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// Route to store userid for image unlike
router.put("/unlike", requireLogin, (req, res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// Modify Comment 
router.put("/comment", requireLogin, (req,res)=>{
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments: comment }
    },{
        new: true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// API to delete post
router.delete("/deletePost/:postId", requireLogin, (req, res)=>{
    POST.findOne({_id: req.params.postId})
    .populate("postedBy","_id")
    .exec((err, post) =>{
        if (err || !post) {
            return res.status(422).json({error:err})
        }
        // console.log(post.postedBy._id.toString(), req.user._id.toString())
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                return res.json({message:"Successfully Deleted"})
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
 })


//  To show folowing post
router.get("/myfollowingpost", requireLogin,(req,res)=>{
    POST.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {console.log(err) })
})

module.exports = router