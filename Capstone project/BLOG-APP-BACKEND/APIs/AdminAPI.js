import exp from 'express'
import {verifyToken} from '../middlewares/verifyToken.js'
import { checkAdmin } from '../middlewares/checkAdmin.js';
import { } from '../middlewares/checkAdmin.js'
export const  adminRoute = exp.Router();
//Authenticate admin or login is in common api
//Read all articles(optional)
//Block user
adminRoute.post('/block:id',verifyToken,checkAdmin,async(req,res)=>{
    
    
})
//Unblock user