import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
dotenv.config();

const app = express();
app.use(express.json());



app.post('/books', async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message: 'Fill all the required fields'})
        } 
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT,() => {
        console.log(`App is listening to port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(error);
})