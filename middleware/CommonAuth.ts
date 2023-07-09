import { Request, NextFunction, Response } from 'express'
import {AuthPayload } from '../dto'
import { ValidateSignature } from '../utility';


// declare global {
//     namespace Express{
//         interface Request{
//             user?: AuthPayload;
//             customProperty: string;
//         }
//     }
// }

export interface MyUserRequest extends Request {
    // Use `user?:` here instead of `user:`.
    user?: AuthPayload;
  }


// declare module 'express-serve-static-core' {
//     interface Request {
//       customProperty?: string; // Use optional modifier (?)
//     }
//   }



export const Authenticate = async (req: MyUserRequest, res: Response, next: NextFunction) => {

    const signature = await ValidateSignature(req);
    if(signature){
        return next()
    }else{
        return res.json({message: "User Not authorised"});
    }
}
