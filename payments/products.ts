import { Request, Response } from 'express';
import Stripe from "stripe";
import { config } from "dotenv";
config();
const secretKey=process.env.STRIPE_SECRET_KEY as string;
const stripe=new Stripe(secretKey, {apiVersion:'2023-08-16'});


export const createProduct=async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        const addedProduct= await stripe.products.create({
            name:req.body.product_name,
            active:req.body.isProductInTrasit,
            description:req.body.description,
            images:[req.body.imageURL],
            // default_price_data:req.body.amount,
        })
        res.status(200).send(addedProduct);
    } catch (error) {
        res.status(500).send(error);
    }
}


export const retrieveProduct=async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        const retrieveProduct= await stripe.products.retrieve(
            req.query.product_id as string
        )
        res.status(200).send(retrieveProduct);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const updateProduct=async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        const updatedProduct= await stripe.products.update(
            req.body.product_id,
            {metadata:{product_number:req.body.product_number},
            images:[req.body.imageURL],
            description:req.body.description,
            
            default_price:req.body.price_id},
        )
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send(error);
    }
}


export const listProduct=async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        const Products= await stripe.products.list({
            limit:req.query.numberOfProduct as any,
     })
        res.status(200).send(Products);
    } catch (error) {
        res.status(400).send(error);
    }
}


export const deleteProduct=async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        const deletedProducts= await stripe.products.del(
           req.query.product_id as string
     )
        res.status(200).send(deletedProducts);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const searchProduct=async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        // const inTransit=req.query.isActive;
        const product_number=req.query.product_number;
        const findProducts= await stripe.products.search({
            query: `metadata[\'product_number\']:\'${product_number}\'`,  //active:\'${inTransit}\' AND 
        })
        res.status(200).send(findProducts);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const createPrice =async (req:Request,res:Response)=>{
// #swagger.tags = ['Stripe Product Catalog']

    try {
        const amount=req.body.unit_amount;
        const price= await stripe.prices.create({
            unit_amount_decimal:`${amount*100}`,
            currency:req.body.currency,
            product:req.body.product_id,
            billing_scheme:'per_unit',
        })
        res.status(200).send(price);
    } catch (error) {
        res.send(400).send(error);
    }
}