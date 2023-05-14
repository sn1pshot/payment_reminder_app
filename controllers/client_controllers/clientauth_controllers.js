const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function client_signup(req,res){
    const{client_username,client_email,client_password} = req.body
    const data = await prisma.client.findUnique({where:{client_username:client_username}})
    if(data){return res.status(409).json("client already exists")}
    try {
        const salt = await bcrypt.genSalt()
        const hashedpwd = await bcrypt.hash(client_password,salt)
        const newClient = await prisma.client.create({data:{
           client_username:client_username,
            client_email:client_email,
            client_password:hashedpwd
        }})
        return res.status(200).json("Client created")
    } 
    catch (error) {
        return res.status(409).json("Client not created")
    }
}

async function client_login(req,res){
    const{client_username,client_password} = req.body
    try {
        const data = await prisma.client.findUnique({
            where: {
                client_username:client_username
            }
        });
        if(!data) return res.status(400).json("Client not found");
        const match = await bcrypt.compare(client_password, data.client_password);
        if (!match) return res.status(400).json("Wrong Password");
        const client_id = data.client_id;
        const client_email = data.client_email;
        const accessToken = jwt.sign({client_id,client_email}, process.env.ACCESS_TOKEN_SECRET);

        res.cookie("access_token",accessToken,{
            httpOnly:true
        }).status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json("Client not found");
    }
    
}

module.exports={
    client_signup,
    client_login
}

