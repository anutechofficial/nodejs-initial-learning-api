import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
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
     
        const card = await stripe.customers.createSource(
            req.body.customer_id,
            {source: 'tok_mastercard'}
          );
        res.status(200).send({ card:card.id });
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

export const listSources = async( req:Request,res:Response)=>{
    try {
        // const customer_id=req.query.customer_id;
        const cards= await stripe.customers.listSources(
            req.query.customer_id as string
           );
          res.status(200).send(cards);
    } catch (error) {
        res.status(404).send('Somthing went worng!');
    }
}

export const updateCard= async(req:Request,res:Response)=>{
        try{
                const updatedCard= await stripe.customers.updateSource(
                    req.body.customer_id,
                    req.body.card_id,
                    {name:req.body.updated_Name}
                    );
                    res.status(200).send(updatedCard);
        }catch(error){
            res.status(500).send(error);
        }
    }

export const deleteCard =async(req:Request,res:Response)=>{
        try {
                const deletedCard= await stripe.customers.deleteSource(
                    req.body.customer_id,
                    req.body.card_id
                );
                res.status(200).send(deletedCard);
            } catch (error) {
                res.status(500).send(error);
            }
    }

export const getBalance = async(req:Request,res:Response)=>{
            try {
                const balance = await stripe.balance.retrieve();
                res.status(200).send(balance);
            } catch (error:any) {
                res.status(400).send({success:false,msg:error.message});
            }
    }

 export   const createPaymentIntent= async (req:Request,res:Response)=>{
        try {
            const createdIntent= await stripe.paymentIntents.create({
                amount:req.body.amount,
                currency:req.body.currency,
                automatic_payment_methods: {enabled: true},
        });
        res.status(200).send(createdIntent);
        } catch (error) {
            res.status(500).send(error);
        }
    }