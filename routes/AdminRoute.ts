import express, {Request,Response,NextFunction} from 'express'
import { CreateVendor, GetVendors,GetVendorById } from '../controllers';

const router = express.Router();

router.get('/',(req: Request, res: Response, next: NextFunction)=>{
    res.json({message: 'From Admin router'})
})

router.post('/vendor',CreateVendor);
router.get('/vendors',GetVendors);
router.get('/vendor/:id',GetVendorById);

export {router as AdminRoute};

