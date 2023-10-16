import {createCustomer, addNewCard, createCharges, listScourse,updateCard,deleteCard,getBalance} from "../payments/customer";
import {createPaymentIntent} from "../payments/customer";

import  express from "express";

const router=express.Router();

router.post('/createCustomer', createCustomer);
router.post('/addCard', addNewCard);
router.post('/charges', createCharges);
router.post('/fetchCards', listScourse);
router.post('/updateCard', updateCard);
router.post('/deleteCard', deleteCard);
router.get('/getBalance', getBalance);
router.post('/createPaymentIntent', createPaymentIntent);



export default router;

