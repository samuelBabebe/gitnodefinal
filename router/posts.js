const express = require("express")
const userControler = require("../controller/users")
const postControler = require("../controller/posts")
const router = express.Router()

router.use(userControler.Authorizer)
router.get("/feed",postControler.findAllPosts)
router.post("/",postControler.addPost)
router.put("/",postControler.updatePost)
router.get("/user/:userid",postControler.findPostById)
router.get("/search",postControler.findPosts)
 router.delete("/:id",postControler.deletePost)
// router.get("/:company/:department",postControler.findPosts)
// router.get("/:department",postControler.findPosts)

module.exports =  router