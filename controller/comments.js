const commentModel = require("../model/comments")


exports.addComment = async (req,res) =>{
   
    let postid = req.params.postid
    console.log(postid)
    let comment = new commentModel()
    try{
        let result = await comment.addcommentToPost(postid,req.body)
        res.send(result)
    }catch(err){
        res.status(500).send("server eror")
    }
}

exports.updateComment = async (req,res) =>{
    let postid = req.params.postid
    const {c_id} = req.query
    let comment = new commentModel()
    try{
        let result = await comment.updateComment(postid,c_id,req.body)
        res.send(result)
    }catch(err){
        res.status(500).send("server eror")
    }
}

exports.deleteComment = async (req,res) =>{
    let postid = req.params.postid
    const {c_id} = req.query
    let comment = new commentModel()
    try{
        let result = await comment.deleteComment(postid,c_id)
        res.send(result)
    }catch(err){
        res.status(500).send("server eror")
    }
}


exports.getpostscomment = async(req,res)=>{
    let postid = req.params.postid
    
    let comment = new commentModel()
    try{
        let result = await comment.getcomment(postid)
        res.send(result)
    }catch(err){
        res.status(500).send("server eror")
    }
}


