
const User = require('../models/user.js'
)
const bcrypt = require('bcryptjs')

export const CreateUser = async(req,res)=>{
 
    try {
        const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(403).json({
            success:false,
            message:"Fields are Required"
        })
        return;
    }
   
    const ExistingUser = await User.findOne({email})
    if(ExistingUser){
        res.status(402).json({
            success:false,
            message:"User Already Exists!"
        })
        return;
    }
    const hashedPassword = await bcrypt.hash(password,8)
    const newUser = new User({name,email,password:hashedPassword})
    await newUser.save()
    res.status(201).json({
        success:true,
        message:"User Created Successfully",
        User:{
            id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            createdAt:newUser.createdAt
        }
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message})
    }

}

export const GetUsers = async(req,res)=>{
    
    try {
        const users = await User.find().select('-password')
        res.status(200).json({
            success:true,
            Total: users.length,
            Users:users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message})
    }
}

export const UpdateUser =async(req,res)=>{
    try {
        const updates = req.body
         if(Object.keys(updates).length == 0){
            res.status(400).json({
                success:false,
                message:"No fields provided to Update!"
            })
         }
        const userId = req.params.id
        const UpdatedUser = await User.findByIdAndUpdate(userId,{ $set:updates
        },{new:true})

        if(!UpdatedUser){
            res.status(404).json({
                success:false,
                message:"User not found!"
            })
            return;
        }
        res.status(201).json({
            success:false,
            message:'Update Successfull!'
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const DeleteUser = async(req,res)=>{

    try {
        const userId = req.params.id 
    const DeletedUser = await User.findByIdAndDelete(userId)

    if(!DeletedUser){
        res.status(404).json({
            success:false,
            message:"User not found!"
        })
        return;
    }

    res.status(201).json({
        success:true,
        message:"User Deleted Successfully"
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
            
        })
         
    }


}
