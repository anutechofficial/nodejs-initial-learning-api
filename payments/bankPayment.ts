import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
config();
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});

export const addBank= async (req:Request,res:Response)=>{
    try {
        const token = await stripe.tokens.create({
            bank_account: {
              country: req.body.country_code,
              currency: req.body.currency,
              account_holder_name: req.body.account_holder_name,
              account_holder_type: req.body.account_holder_type,
              routing_number: req.body.routing_number,
              account_number: req.body.account_number,
            },
          });
        const addedBank= await stripe.customers.createSource(
            req.body.customer_id,
            {source:token.id}
            );
        res.status(200).send(addedBank);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const retrieveBank = async (req:Request,res:Response)=>{
    try {
        const bankAccount = await stripe.customers.retrieveSource(
            req.query.customer_id as string,
            req.query.bank_id as string
          );
          res.status(200).send(bankAccount);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateBank=async (req:Request,res:Response)=>{
    try {
        const updatedBank= await stripe.customers.updateSource(
            req.body.customerId,
            req.body.bank_id,
            {metadata:{order_id:req.body.order_id}}
        )
        res.status(200).send(updatedBank);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const verifyAccount=async (req:Request,res:Response)=>{
    try {
        const verifiedAccount = await stripe.customers.verifySource(
            req.query.customer_id as string,
            req.query.bank_id as string,
            {amounts: [32, 45]}
          );
          res.status(200).send(verifiedAccount);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const deleteBank=async (req:Request,res:Response) => {
    try {
        const deletedBank= await stripe.customers.deleteSource(
            req.body.customer_id,
            req.body.bank_id
        );
        res.status(200).send(deletedBank);
    } catch (error) {
        res.status(400).send(error);
        
    }
}