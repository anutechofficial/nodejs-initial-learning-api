import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
config();
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});


export const createPlan= async (req:Request,res:Response)=>{
// #swagger.tags = ['SUBSCRIPTION']

    try {
        const plan= await stripe.plans.create({
            currency:req.body.currency,
            amount:(req.body.amount)*100,
            interval:req.body.interval,
            product:req.body.product_id,
        });
        res.status(200).send(plan);
    } catch (error) {
        res.status(400).send(error);
        
    }
}

export const createSubscription= async (req:Request, res:Response)=>{
// #swagger.tags = ['SUBSCRIPTION']

    try {
        const subscription= await stripe.subscriptions.create({
            customer:req.body.customer_id,
            items:[{plan:req.body.plan_id},]
        });
        res.status(200).send(subscription);
    } catch (error) {
        res.status(400).send(error);
    }
}