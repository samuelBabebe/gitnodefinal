const express = require("express")
const userController = require("../controller/users")
const commentControler = require("../controller/comments")

const router = express.Router()

router.use(userController.Authorizer)
router.post("/post/:postid",commentControler.addComment)
router.put("/post/:postid",commentControler.updateComment)
router.delete("/post/:postid",commentControler.deleteComment)
router.get("/post/:postid",commentControler.getpostscomment)


module.exports =  router