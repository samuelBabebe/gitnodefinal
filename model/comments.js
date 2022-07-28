const mongoose = require("mongoose")

const commenntSchema = mongoose.Schema({
    post_id:{type:String,index:true},
    comment:[
        {   
            userName:{type:String,index:true},
            description:{type:String},
            deleted:{type:Boolean},
            picture:{type:String},
            date: {type:Date}
        }
    ]
})

const commentModel = mongoose.model("comment",commenntSchema)

class Comment{
    constructor(post_id){
        this.post_id = post_id;
       
    }

    createComment = async () =>{
        try{
            let save  = new commentModel(this)
            await save.save()
            return "created"
        }catch(err){
            return "db eror"
        }
       }

    addcommentToPost = async (postid,commentData) =>{
        try{
            await commentModel.findOneAndUpdate({post_id:postid},{$addToSet:{"comment":commentData}})
            return "saved"

        }catch(err){
            return "db eror"
        }
    }
    updateComment = async (postid,commentid,commentData) =>{
        try{
            await commentModel.findOneAndUpdate({post_id:postid,"comment._id":commentid},{$set:{"comment.$":commentData}})
            return "updated"
        }catch(err){
            return "db eror"
        }
    }
    deleteComment = async (postid,commentid) =>{
        try{
            let result = await commentModel.findOneAndUpdate({post_id:postid,"comment._id":commentid},{$set:{"comment.$.deleted":true}})
            console.log(result)
            return "deleted"
        }catch(err){
            return "db eror"
        }
    }

    getcomment = async (postid) =>{
            try{
                let result = commentModel.find({post_id:postid})
                return result
            }catch(err){
                return "db eror"
            }
    }
}

module.exports = Comment