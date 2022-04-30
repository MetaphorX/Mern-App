const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler( async(req, res)=>{
    const{name, email, password} = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('add fields')
    }

    const userExist = User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('user already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = User.create({
        name,
        email,
        password: hashPassword
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler( async(req, res)=>{
    res.json({message: 'login user'})
})
const getUser = asyncHandler( async(req, res)=>{
    res.json({message: 'get user data'})
})


module.exports = {
    registerUser,
    loginUser,
    getUser
}