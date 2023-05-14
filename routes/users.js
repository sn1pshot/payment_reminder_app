const express = require("express")
const user_Router = express.Router()
const{signup,login} = require("../controllers/user_controllers/auth_controllers")
const{getUser,updateUser,deleteUser} = require("../controllers/user_controllers/user_controllers")

user_Router.post("/signup",signup)
user_Router.post("/login",login)
user_Router.get("/profile",getUser)
user_Router.put("/update",updateUser)
user_Router.delete("/delete",deleteUser)

module.exports = user_Router