const express = require("express")
const user_Router = express.Router()
const{createUser,getUser,updateUser,deleteUser} = require("../controllers/user_controllers/user_controllers")

user_Router.post("/create",createUser)
user_Router.get("/profile",getUser)
user_Router.put("/update",updateUser)
user_Router.delete("/delete",deleteUser)

module.exports = user_Router