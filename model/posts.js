const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    user_id:{type:String, index:true,required:true},
    department:{type:String},
    userName:{type:String,index:true},
    post:[{
        post_id:{type:String ,unique:true,index:true},
        company:{type:String, index:true},
        
        discription:{type:String},
        picture:{type:String},

        deleted:{type:Boolean},
        date:{type:Date}

    }],
    
},
{timestamps: true}
)

const postModel = mongoose.model("posts",postSchema)

class Posts{
    constructor(user_id,department,userName){
        this.user_id = user_id;
        this.department = department
        this.userName = userName
       
    }

    createPost = async ()=>{
        try{
            let save = new postModel(this)
            await save.save()
            return "created"
        }catch(err){
            return err
        }
    }

    findAllPosts = async ()=>{
        try{
            let result = await postModel.find().sort({updatedAt:-1})
            return result
        }catch(err){
            return "db eror"
        }
    }
    findPostByUserId = async (userid)=>{
        try{
            let result = await postModel.findOne({user_id:userid})
            return result
        }catch(err){
            return "db eror"
        }
    }

    findPosts = async (company,department) =>{
        try{
            if(company && department){
                let result = await postModel.find({post:{$elemMatch:{company:company}},department:department})
                return result
            }else if(company){
               
                let result = await postModel.find({post:{$elemMatch:{company:company}}})
                return result
            }else if(department){
                //let result = await postModel.find({post:{$elemMatch:{department:department}}})
                let result = await postModel.find({department:department})
                return result
            }
        }catch(err){
            return "db err"
        }
    }

    addPostToUser = async (userid,postData)=>{
        try{
            
                 await postModel.findOneAndUpdate({user_id:userid},{$addToSet:{"post":postData}})
                 return "saved"
                
           
        }catch(err){
            
            return "db eror"
        }
    }

    updatePost = async (userid,postid,postData)=>{
        try{
            await postModel.findOneAndUpdate({user_id:userid,"post.post_id":postid},{$set:{"post.$":postData}})
           
            return "updated"
        }catch(err){
            
            return "db eror"
        }
    }
    deletePost = async (userid,postid) =>{
        try{
            let result = await postModel.findOneAndUpdate({user_id:userid,"post.post_id":postid},{$set:{"post.$.deleted":true}})
            return result
        }catch(err){
                return "db eror"
        }
    }
}

module.exports = Posts