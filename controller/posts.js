const postModel = require("../model/posts")
const commentModel = require("../model/comments")
exports.addPost = async (req,res) =>{
    let userid = req.user.user_id
    const {post_id} = req.body
    let posts = new postModel()
    let comment = new commentModel(post_id)
    try{
        await posts.addPostToUser(userid,req.body)
        let commentResult = await comment.createComment()
            res.send(commentResult)
    }catch(err){
            res.status(500).send("server eror")
    }
}

exports.findAllPosts = async (req,res) =>{
    let post = new postModel()
    try{
        let result = await post.findAllPosts()
        if(result!=="db eror"){
           
            let hashmap = {}
            let finalresult = []
            result.map(item=>{
                item.post.map(post=>{
                    
                  let userkey = post.post_id
                  
                  hashmap[userkey]=[item.userName,item.user_id]})
              })
              
                result.map(item=>finalresult.push(...item.post))
                
            res.send({hashmap,finalresult})
        }else{
            res.status(503).send("data base eror")
        }
    }catch(err){
        res.status(500).send("server eror")
    }
}

exports.findPostById = async (req,res) =>{
    let userid = req.params.userid
    const post = new postModel()
    try{
        let result = await post.findPostByUserId(userid)
        res.send(result)
    }catch(err){
        res.status(500).send("server eror")
    }
}

exports.updatePost = async (req,res) =>{
    let userid = req.user.user_id
    const {post_id} = req.body
    let post = new postModel()
    try{
        let result = await post.updatePost(userid,post_id,req.body)
        
        if(result!=="db eror"){
            res.send("saved")
        }else{
            res.send(result)
        }
        
    }catch(err){
        res.status(500).send("server eror")
    }
}

exports.findPosts = async (req,res) =>{
    const {company,department} = req.query
        console.log(req.query)
    let posts = new postModel()
    try{
        if(company && department){
            let result = await posts.findPosts(company,department)
            if(result[0] && result!=="db eror"){
                let nextresult = []
                let hashmap = {}
           
            result.map(item=>{
                item.post.map(post=>{
                    
                  let userkey = post.post_id
                  
                  hashmap[userkey]=[item.userName,item.user_id]})
              })
                 result.map(item=>nextresult.push(...item.post))
                
                let finalresult = nextresult.filter(item=>item.company===company)
                 res.send({hashmap,finalresult})
            }else{
                res.send(result)
            }
            
        }else if(company){
           
            let result = await posts.findPosts(company)
            if(result[0] && result!=="db eror"){
                let nextresult = []
                 result.map(item=>nextresult.push(...item.post))
                
                let finalresult = nextresult.filter(item=>item.company===company)
                 res.send(finalresult)
            }else{
                res.send(result)
            }
        }else if(department){
            let result = await posts.findPosts(department)
            if(result[0] && result!=="db eror"){
                let nextresult = []
                 result.map(item=>nextresult.push(...item.post))
                
                // let finalresult = nextresult.filter(item=>item.department===department)
                 res.send(nextresult)
            }else{
                res.send(result)
            }
        }else{
            res.send("no parameters selected")
        }
    }catch(err){
        res.status(500).send("server eror")
    }
}

exports.deletePost = async (req,res) =>{
    
    let userid = req.user.user_id
    let postid = req.params.id
    let post = new postModel()
    try{
        let result = await post.deletePost(userid,postid)
      
        res.send(result)
    }catch(err){
        res.status(500).send("server eror")
    }
}
