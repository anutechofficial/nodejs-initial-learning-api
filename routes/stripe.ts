import {createCustomer, addNewCard} from "../payments/customer";

import  express  from "express";

const router=express.Router();

router.post('/createCustomer', createCustomer);
router.post('/addCard', addNewCard);


export default router;

