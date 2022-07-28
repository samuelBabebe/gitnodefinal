const userModel = require("../model/users")
const postModel = require("../model/posts")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const privateKey = "nfkjenvjbesfjvberbver"
exports.GetAllUsers = async(req,res)=>{
    let user = new userModel()
    try{
        let result = await user.GetAllUsers()
        res.send(result)
    }catch(err){
        if(err){
            res.status(500).send("server erors",err)
        }
    }
    
    
}

exports.GetFriends = async(req,res)=>{
    
    let userName = req.params.name
   
    let users = new userModel()
    try{
        let result = await users.GetFriends(userName)
        res.send(result)
    }catch(err){
        if(err){
            res.status(500).send("server eror",err)
        }
    }
}

exports.UserSignup = async(req,res)=>{
    const {user_id, first_Name,last_Name,email,passWord,phoneNo,linkden_link,department,role,userName,profilePic} = req.body;
    let hashedPassWord = bcrypt.hashSync(passWord,13)
    let users = new userModel(user_id, first_Name,last_Name,email,hashedPassWord,phoneNo,linkden_link,department,role,userName,profilePic);
    let post = new postModel(user_id,department,userName)
    try{
        let user = await users.UserSignup()
       
        
        if(user==="saved" ){
            let createPost = await post.createPost()
            if(createPost==="created"){
                res.status(200).send("saved")
            }else{
                res.status(500).send(createPost)
            }
            
        }else if(user === "email already taken" || "user name already taken"){
            res.send(user)
        }
        
        
    }catch(err){
        if(err){
            res.status(500).send("server eror",err);
        }
    }
}

exports.logIn = async (req,res)=>{
  
    const {email,passWord} = req.body;
    let user = new userModel()
   
    try{
       
        let result = await user.logIn(email)
       
        if(result){
           
            let compare = bcrypt.compareSync(passWord,result.hashedPassWord)
            
            if(compare){
                
                let token = jwt.sign({user_id:result.user_id,userName:result.userName,role:result.role,email:email},privateKey) 
                res.json({token,userid:result.user_id,userName:result.userName})
            }else{
                res.send("password incorect")
              
            }
        }else{
            res.send("user did not registered")
            
        }
    }catch(err){
        if(err){
            res.status(500).send("server eror")
        }
    }
    
}

exports.updateProfiledata = async(req,res)=>{
    let userid = req.user.user_id
    
    if(userid){
        //
        try {
            let user = new userModel()
            let result = await user.getUserById(userid)
           if(result){
            const {user_id,first_Name,last_Name,phoneNo,linkden_link,department,role,email,profilePic} = req.body;
            let hashedPassWord = result.hashedPassWord
            let users = new userModel(user_id,first_Name,last_Name,email,hashedPassWord,phoneNo,linkden_link,department,role,profilePic);
             users.updateProfile(userid)
            res.send("saved")
           }else{
            res.send("something wrong")
           }
        }catch(err){
            
            res.status(500).send("server eror")
        }
    }else{
        res.status(403).send("not authorized")
    }
}

exports.Authorizer = (req,res,next)=>{
    let tokenVal = req.headers.authorization
    
    if(tokenVal){
        let token = tokenVal.split(" ")
         jwt.verify(token[1],privateKey,(err,user)=>{
            if(err){
                res.send('token verfication eror')
                
            }
           
            req.user = user
            next()
        })
    }else{
        res.send("forbiden")
    }
}