const {User,Book}=require("../models")
const { AuthenticationError } = require("apollo-server-express");
const { signToken,authMiddleware } = require("../utils/auth");

//All resolvers and mutations. copied from the user-controller.js and repurposed for using graphQL. All queries and mutations work. 

const resolvers={
    Query:{
        user:async(parent,{token})=>{
            const user= authMiddleware(token)
            return await User.findById(user.id)
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
        },
        saveBook:async(parent,{user,body})=>{
            return User.findOneAndUpdate(
                {_id:user.id},
                {$addToSet:{savedBooks:body}},
                {new:true,runValidators:true}
            )
        },
        deleteBook:async(parent,{user,body})=>{
            return await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: body.bookId } } },
                { new: true }
              )
        }
    }
}
module.exports=resolvers