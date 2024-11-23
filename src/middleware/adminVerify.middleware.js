import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const AdminVerify=asyncHandler((req,_,next)=>{
    console.log("req.user",req.user);
    
    if(req.user.role=="user"){
        throw new ApiError(401, "UnAuthorized request");
    }
    next()
})