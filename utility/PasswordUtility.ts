import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto/Auth.dto';
import { MyUserRequest } from '../middleware';


export const GenerateSalt = async () => {
    return await bcrypt.genSalt()    
}

export const GeneratePassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);

}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = async (payload: AuthPayload) => {

    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d'});
 
 }

 export const ValidateSignature  = async(req: MyUserRequest) => {

    const signature = req.get('Authorization');
    console.log('signature ',signature)
    if(signature){
        try {
            // console.log('signature payload 000 ', )
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload; 
            console.log('signature payload ',payload)
            req.user = payload;
            // req.user = req.body;

            return true;

        } catch(err){
            console.log('signature err ',err)
            // return false
            return err 
        } 
    }
    return false
}; 