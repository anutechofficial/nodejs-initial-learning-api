import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
config();
import userModel from '../models/user.model';
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});

export const createSession= async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Payment Sessions']

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
// #swagger.tags = ['Stripe Payment Sessions']

    try {
        const getUsername=req.body.username as string;
        const userData= await userModel.findOne({username:getUsername});
        const {stripeUser_id}=userData as any;
        const product_id=req.body.product_id;
        const retrieveProduct= await stripe.products.retrieve(product_id);
        const productPrice= retrieveProduct.default_price;
        const checkoutDetails= await stripe.checkout.sessions.create({
            success_url:'https://henceforthsolutions.com/',
            line_items:[ 
                {price:req.body.priceId || productPrice, 
                quantity:req.body.numberOfItem || 1}],
            //Pass subscription if the Checkout Session includes at least one recurring item(Plans)
            mode:req.body.mode || 'payment',
            payment_method_types:[req.body.payment_method_types], //Required in setup mode 
            customer:req.body.customer_id || stripeUser_id,
            cancel_url:'https://henceforthsolutions.com/',
        })
        res.status(200).send(checkoutDetails.url);
    } catch (error) {
        res.status(500).send(error);
    }
}