const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

//create user
async function createUser(req,res){
    const{username,email,password} = req.body
    try{
        const newUser = await prisma.user.create({data:{
            username:username,
            email:email,
            password:password
        }})
        return res.status(200).json("user created successfully")
    }
    catch(error){
        return res.status(409).json("username or email already exists")
    }   
}
//get user
async function getUser(req,res){
    const id = req.id
    // const{username,password} = req.body
    try {
        const data = await prisma.user.findUnique({where:{
            id:id
        }})
        return res.status(200).json(data)
        
    } 
    catch (error) {
        return res.status(401).json("user not found")
    }
}
//update user
async function updateUser(req,res){
    const id = req.id
    const{username,email,password} = req.body
    try {
        const newUser = await prisma.user.update({where:{
            id:id
        },
        data:{
            username:username,
            email:email,
            password:password
        }})
        return res.status(200).json(newUser)
    } 
    catch (error) {
        return res.status(401).json("user not found")
    }
}
//delete user
async function deleteUser(req,res){
    const id = req.id
    try {
        await prisma.user.delete({where:{id:id}})
        return res.status(200).json("user deleted")
    } 
    catch (error) {
        return res.status(401).json("user not found")    
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}