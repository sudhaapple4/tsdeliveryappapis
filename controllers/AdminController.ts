import { Express, Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";
import { MyUserRequest } from "../middleware";


export const FindVendor = async (id: String | undefined, email?: string) => {
    console.log('----------------------------- ',email)

    if(email){
        return await Vendor.findOne({ email: email})
    }else{
        return await Vendor.findById(id);
    }

}

export const CreateVendor = async ( req: Request, res: Response, next: NextFunction) => {
    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;

    const existingVandor = await FindVendor('', email);
    console.log(existingVandor)

    if(existingVandor !== null){
        return res.json({ "message": "A vandor is exist with this email ID"})
    }

    const salt =  await GenerateSalt();
    console.log(salt)
    const userPassword = await GeneratePassword(password, salt);
    console.log(userPassword)

    const createdVandor =  await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        lat: 0,
        lng: 0
    })

    return res.json(createdVandor)
    
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

    const vendors = await Vendor.find()

    if(vendors !== null){
        return res.json(vendors)
    }

    return res.json({"message": "Vendors data not available"})
    

}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;

    const vendors = await FindVendor(vendorId);

    if(vendors !== null){
        return res.json(vendors)
    }

    return res.json({"message": "Vendors data not available"})
}