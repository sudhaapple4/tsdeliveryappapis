import express, {Request,Response,NextFunction} from 'express'
import { AddFood, GetFoods, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers';
import { Authenticate } from '../middleware';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'images')
    },
    filename: function(req,file,cb){
        // cb(null, new Date().toISOString()+'_'+file.originalname);
        const ts=new Date().toISOString()+'-'+file.originalname
        console.log('--- new Date().toISOString() ', ts)
        cb(null, file.originalname);
    }
})
console.log('before images  ')
const images = multer({ storage: imageStorage}).array('images', 10);
console.log('after images  ',images)
router.get('/',(req: Request, res: Response, next: NextFunction)=>{
    res.json({message: 'From Vendor router'})
})

router.get('/login', VendorLogin);

router.use(Authenticate)
router.get('/profile', GetVendorProfile);
router.patch('/profile', UpdateVendorProfile);
// router.patch('/coverimage', images,UpdateVendorCoverImage);
router.patch('/service', UpdateVendorService);
// rou
router.post('/food',images, AddFood);
router.get('/food',GetFoods)

export {router as VendorRoute};