const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    user_id:{type:String,unique:true,index:true},
    first_Name:{type:String},
    last_Name:{type:String},
    email:{type:String, required:true,index:{unique:true}},
    hashedPassWord:{type:String},
    phoneNo:{type:String},
    linkden_link:{type:String},
    department:{type:String},
    role:{type:String},
    coverPicture:{type:String},
    userName:{type:String,unique:true}
    
})

const userModel = mongoose.model("users",usersSchema)

class Users{
    constructor(user_id, first_Name,last_Name,email,hashedPassWord,phoneNo,linkden_link,department,role,userName,profilePic){
       this.user_id = user_id
        this.first_Name=first_Name;
        this.last_Name = last_Name;
        this.email = email;
        this.hashedPassWord = hashedPassWord;
        this.linkden_link = linkden_link;
        this.department = department;
        this.role = role;
        this.phoneNo = phoneNo;
        this.userName = userName
        this.profilePic = profilePic

    }

    GetAllUsers = async()=>{
        try{
            let result = await userModel.find()
            return result
        }catch(err){
            if(err){
                console.log("what")
                return "db eror"
            }
            console.log("whatsss")
        }
        
    }

    GetFriends = async(name) =>{
        
        try{
           let result = await userModel.find({userName:name}) 
           return result
        }catch(err){
            if(err){
                return "db eror"
            }
        }
    }

    UserSignup = async()=>{

        try{
            let user = await this.logIn(this.email)
            let username = await this.GetFriends(this.userName)
            if(!user && !username[0]){
               
                let save  =  new userModel(this)
                await save.save()
                return "saved"
            }else if(!username[0] && user){
             
                return "email already taken"
            }else if(!user && username[0]){
              
                return "user name already taken"
            }
            
           
        }catch(err){
            if(err){
                return "db eror"
            }
        }
        
    }

    logIn = async (email)=>{
        try{
            let result = await userModel.findOne({email:email})
            return result
        }catch(err){
            if(err){
                return "db eror"
            }
        }
    }

    updateProfile = async (userid)=>{
        try{
            return await userModel.updateOne({user_id:userid},this)
        }catch(err){
            return "db eror"
        }
    }
    getUserById = async (userid) =>{
        try{
            return await userModel.findOne({user_id:userid})
        }catch(err){
            return "db eror"
        }
    }

}

module.exports = Users

