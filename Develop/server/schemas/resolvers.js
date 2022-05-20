const {User,Book}=require("../models")
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers={
    Query:{
        user:async(parent,{id})=>{return await User.findById(id)
        },
        users:async(parent)=>{
            return await User.find({})
        }
    },
    Mutation:{
        createUser:async(parent,{username,email,password})=>{
            return await User.create({username,email,password})
        },
        login:async(parent,{email,password})=>{
            const user= await User.findOne({email})
            if (!user){
                throw new AuthenticationError("Wrong email or password")
            }
            const correctPw=await user.isCorrectPassword(password)
            if (!correctPw){
                throw new AuthenticationError("Wrong email or password")
            }
            const token = signToken(user)
            return {token, user}
        }
    }
}
module.exports=resolvers