const {User,Book}=require("../models")
const { AuthenticationError } = require("apollo-server-express");
const { signToken,authMiddleware } = require("../utils/auth");

//All resolvers and mutations. copied from the user-controller.js and repurposed for using graphQL. All queries and mutations work. 

const resolvers={
    Query:{
        me:async(parent,{token})=>{
            const user= authMiddleware(token)
            return await User.findById(user.id)
        }
    },
    Mutation:{
        addUser:async(parent,{username,email,password})=>{
            const user= User.create({username,email,password})
            const token=signToken(user)
            return {token,user}
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
        },
        saveBook:async(parent,{token,description,bookId,title,authors,link,image})=>{
            const user= authMiddleware(token)
            return User.findOneAndUpdate(
                {_id:user.id},
                {$addToSet:{savedBooks:{description,bookId,title,authors,link,image}}},
                {new:true,runValidators:true}
            )
        },
        removeBook:async(parent,{token,bookId})=>{
            const user= authMiddleware(token)
            return await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
              )
        }
    }
}
module.exports=resolvers