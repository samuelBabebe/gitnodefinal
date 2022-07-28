const express = require("express")
const userControler = require("../controller/users")
const router = express.Router()

router.post("/signup",userControler.UserSignup);
router.post("/login",userControler.logIn)

router.use(userControler.Authorizer)

router.get("/",userControler.GetAllUsers);
router.get("/:name",userControler.GetFriends);
router.put('/',userControler.updateProfiledata)

module.exports =  router