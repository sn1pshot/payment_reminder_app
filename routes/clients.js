const express = require("express")
const client_Router = express.Router()
const{client_signup,client_login} = require("../controllers/client_controllers/clientauth_controllers")
const{getClient,updateClient,deleteClient} = require("../controllers/client_controllers/client_controllers")

client_Router.post("/signup",client_signup)
client_Router.post("/login",client_login)
client_Router.get("/profile",getClient)
client_Router.put("/update",updateClient)
client_Router.delete("/delete",deleteClient)

module.exports = client_Router