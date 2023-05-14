const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function signup(req,res){
    const{username,email,password} = req.body
    const data = await prisma.user.findUnique({where:{username:username}})
    if(data){return res.status(409).json("user already exists")}
    try {
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password,salt)
        const newUser = await prisma.user.create({data:{
            username:username,
            email:email,
            password:hashed
        }})
        return res.status(200).json("user created")
    } 
    catch (error) {
        return res.status(409).json("user not created")
    }
}

async function login(req,res){
    const{username,password} = req.body
    try {
        const data = await prisma.user.findUnique({
            where: {
                username:username
            }
        });
        if(!data) return res.status(400).json("User not found");
        const match = await bcrypt.compare(password, data.password);
        if (!match) return res.status(400).json("Wrong Password");
        const id = data.id;
        const email = data.email;
        const accessToken = jwt.sign({id,email}, process.env.ACCESS_TOKEN_SECRET);

        res.cookie("access_token",accessToken,{
            httpOnly:true
        }).status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json("user not found");
    }
}

