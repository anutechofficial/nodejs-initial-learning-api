import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
config();
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});

export const createSession= async (req:Request,res:Response)=>{
    try {
        const createdSession= await stripe.billingPortal.sessions.create({
            customer: req.body.customer_id,
            return_url:"https://www.google.com/"

        })
        res.status(200).send(createdSession.url);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const checkoutSession =async (req:Request,res:Response)=>{
    try {
        const checkoutDetails= await stripe.checkout.sessions.create({
            success_url:'https://henceforthsolutions.com/',
            line_items:[ 
                {price:req.body.priceId, 
                quantity:req.body.numberOfItem}],
            mode:'payment',
            customer:req.body.customer_id,
            cancel_url:'https://henceforthsolutions.com/',
        })
        res.status(200).send(checkoutDetails.url);
    } catch (error) {
        res.status(500).send(error);
    }
}