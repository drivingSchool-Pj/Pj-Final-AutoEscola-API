import { Request, Response, NextFunction } from "express";

const validateSchemaMiddleware = (schemas: any) => async (req:Request, res:Response, next: NextFunction) =>{

    try{
    
    const validated = await schemas.validate(req.body,{
        stripUnknow: true,
        abortEarly: true
    })
    
        req.validatedBody = validated
    
        return next()
    
    }catch(err){

        return res.status(400).send({message: err.message})

    }
}

export default validateSchemaMiddleware