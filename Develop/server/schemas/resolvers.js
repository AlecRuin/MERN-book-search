const {User,Book}=require("../models")
const {
    createUser,
    getSingleUser,
    saveBook,
    deleteBook,
    login,
  } = require("../controllers/user-controller");
const resolvers={
    Query:{
        user:async(parent,args)=>{
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
              });
          
              if (!foundUser) {
                return res.status(400).json({ message: 'Cannot find a user with this id!' });
              }
        },
        users:async(parent)=>{
            const users=await User.find({})
            return users
        }
    },
    Mutation:{
        createUser:async(parent,{username,email,password})=>{
            return await User.create({username,email,password})
        }
    }
}
module.exports=resolvers