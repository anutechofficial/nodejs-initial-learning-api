import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
config();
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});


export   const createPaymentIntent= async (req:Request,res:Response)=>{
    try {
        const createdIntent= await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:req.body.currency,
            automatic_payment_methods: {enabled: true},
            confirm:true,
            customer:req.body.customer_id,
            payment_method:req.body.payment_method_id,
            return_url:'https://www.google.com/',
    });
    res.status(200).send(createdIntent);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const retrievePaymentIntent= async (req:Request,res:Response)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
            req.query.paymentIntentId as string
          );
    res.status(200).send(paymentIntent);

    } catch (error) {
        res.status(500).send(error);
    }
}

export const capturePaymentIntent= async (req:Request,res:Response)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.capture(
            req.query.paymentIntentId as string
          );
    res.status(200).send(paymentIntent);

    } catch (error) {
        res.status(500).send(error);
    }
}

export const updatePaymentIntent=async (req:Request,res:Response)=>{
    try {
        const updatedPaymentIntent= await stripe.paymentIntents.update(
            req.body.paymentIntentId,
            {metadata:{order_id:req.body.order_id}}
        )
        res.status(200).send(updatedPaymentIntent);
    } catch (error) {
        res.status(500).send(error);
    }
}


export const confirmPaymentIntent=async (req:Request,res:Response)=>{
    try {
        const intentPaymentDetails= await stripe.paymentIntents.confirm(
            req.body.paymentIntentId,
            {payment_method: 'pm_card_visa'}
        )
        res.status(200).send(intentPaymentDetails);
    } catch (error:any) {
        res.status(500).send({msg:error.message, stats:error.status});
    }
}