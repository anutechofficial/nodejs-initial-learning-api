import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
// import { Request, Response } from 'aws-sdk';
config();
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});

export const createCustomer = async (req:Request, res:Response)=>{
    try{
        const customer = await  stripe.customers.create({
            name:req.body.name,
            email:req.body.email,
        });
        res.status(200).send(customer);
    }
    catch(error: any){
       res.status(400).send(error.message as any);
    }
}

export const addNewCard = async(req:Request,res:Response)=>{
    try {
        const {
            customer_id,
            // card_Name,
            // card_ExpYear,
            // card_ExpMonth,
            // card_Number,
            // card_CVC,

        } = req.body;

        // const card_token = await stripe.tokens.create({
        //     card:{
        //         name: card_Name,
        //         number: '4242424242424242',
        //         exp_year: card_ExpYear,
        //         exp_month: card_ExpMonth,
        //         cvc: card_CVC
        //     }
        // });
        // const card = await stripe.customers.createSource(customer_id, {
        //     source: `${card_token.id}`
        // });
        const card = await stripe.customers.createSource(
            customer_id,
            {source: 'tok_amex'}
          );
        res.status(200).send({ card: card.id });
    } catch (error:any) {
        res.status(400).send({success:false,msg:error.message});
    }
}

export const createCharges= async (req:Request, res:Response)=>{
    try {
        const createdCharges= await stripe.charges.create({
            receipt_email:req.body.email,
            amount:parseInt(req.body.amount)*100,
            currency:'USD',
            // card:req.body.card_id,
            customer: req.body.customer_id,
        });
        res.status(200).send(createdCharges);
    } catch (error:any) {
        res.status(400).send({success:false, msg: error.message})
    }     
}