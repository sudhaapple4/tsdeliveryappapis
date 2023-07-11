import express, { Request, Response, NextFunction } from 'express';
import {  CustomerLogin, CustomerSignUp } from '../controllers';
import { Authenticate } from '../middleware';
import { Offer } from '../models/Offer';

const router = express.Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post('/signup', CustomerSignUp)
/* ------------------- Login --------------------- */
router.post('/login', CustomerLogin)

export { router as CustomerRoute}