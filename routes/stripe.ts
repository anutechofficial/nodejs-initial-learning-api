import {createCustomer, addNewCard, createCharges} from "../payments/customer";

import  express  from "express";

const router=express.Router();

router.post('/createCustomer', createCustomer);
router.post('/addCard', addNewCard);
router.post('/charges', createCharges);


export default router;

