import { Router } from "express";
import { userModel } from "../dao/models/userModel";

const router = Router()

router.get('/', async (req,res)=> {
    try{
        let users = await userModel.find()
        res.send({result:"success", payload:users}) 
    }
    catch(error){
        console.log('Cannot get users with mongoose'+ error);
    }
})

router.put('/uid', async(req,res)=>{
    let {uid} = req.params
    let userToReplace = req.body
    if(!userToReplace.firt_name||!userToReplace.last_name||!userToReplace.email){
        return res.send({status:'success', payload:result})
    }
    let result = await userModel.updateOne({_id:uid}, userToReplace)
    res.send({status:"success",payload:result})
})

router.delete('/uid', async(req,res)=>{
    let {uid} = req.params
    let result = await userModel.deleteOne({_id:uid})
    res.send({status:"success",payload:result})
})

export default userRouter()