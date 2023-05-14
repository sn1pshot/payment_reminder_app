const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

//get client
async function getClient(req,res){
    const client_id = req.client_id
    // const{username,password} = req.body
    try {
        const data = await prisma.client.findUnique({where:{
            client_id:client_id
        }})
        return res.status(200).json(data)
        
    } 
    catch (error) {
        return res.status(401).json("client not found")
    }
}
//update client
async function updateClient(req,res){
    const client_id = req.client_id
    const{client_username,client_email,client_password} = req.body
    try {
        const newUser = await prisma.client.update({where:{
            client_id:client_id
        },
        data:{
            client_username:client_username,
            client_email:client_email,
            client_password:client_password
        }})
        return res.status(200).json(newClient)
    } 
    catch (error) {
        return res.status(401).json("client not found")
    }
}
//delete client
async function deleteClient(req,res){
    const client_id = req.client_id
    try {
        await prisma.client.delete({where:{client_id:client_id}})
        return res.status(200).json("client deleted")
    } 
    catch (error) {
        return res.status(401).json("client not found")    
    }
}

module.exports = {
    getClient,
    updateClient,
    deleteClient
}