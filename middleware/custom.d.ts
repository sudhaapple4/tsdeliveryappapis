import { Request } from 'express';
import { AuthPayload } from '../dto';

// interface CustomRequest extends Request {
//   customProperty?: string;
// }

// declare global {
//   namespace Express {
//     interface Request extends CustomRequest {}
//   }
// }

declare global {
    namespace Express{
        interface Request{
            user?: AuthPayload;
        }
    }
}

// declare module 'express-serve-static-core' {
//     interface Request {
//         customProperty?: any; // Use optional modifier (?)
//     }
//   }