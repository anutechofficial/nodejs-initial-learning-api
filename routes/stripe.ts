import {
    createCustomer, 
    addNewCard,
    createCharges, 
    listSources,
    updateCard,
    deleteCard,
    getBalance,
} from "../payments/customer";

import {createPaymentIntent} from "../payments/customer";

import { addBank,
    retrieveBank,
    updateBank,
    verifyAccount,
    deleteBank 
} from "../payments/bankPayment";

import  express from "express";

const router=express.Router();

//CARD PAYMENTS
router.post('/createCustomer', createCustomer);
router.post('/addCard', addNewCard);
router.post('/charges', createCharges);
router.get('/fetchPaymentSources', listSources);
router.put('/updateCard', updateCard);
router.delete('/deleteCard', deleteCard);
router.get('/getBalance', getBalance);
router.post('/createPaymentIntent', createPaymentIntent);

//BANK PAYMENTS
router.post('/addBank', addBank);
router.get('/retrieveBank', retrieveBank)
router.put('/updateBank',updateBank);
router.get('/verifyBank',verifyAccount);
router.delete('/deleteBank',deleteBank);

export default router;