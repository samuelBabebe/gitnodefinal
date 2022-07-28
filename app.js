const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const userRouter = require("./router/users");
const postRouter = require("./router/posts");
const commentRouter = require("./router/comments")
app.use(cors());
app.use(express.json());

let mongAttlasLink = "mongodb+srv://samuel:mynameissamuelabebe@carierapp.enuga.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect( mongAttlasLink ||"mongodb://localhost:27021/carier",(err)=>{
    if(err){
        console.log("database not connected...")
        return
    }
    console.log("db connected...")
    
});
app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/comment",commentRouter)
app.all("*",(err,req,res,next)=>{
    if(err){
        
        res.send("server eror",{err:err.message})
    }
})

app.listen(80,console.log("listening 80.."));