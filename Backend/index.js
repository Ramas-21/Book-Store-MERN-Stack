import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
dotenv.config();

const app = express();

//middleware for parsing request body
app.use(express.json());


// route to save a new book
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


// route to get all the books
app.get('/getBooks', async (req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(message.error)
        res.status(500).send({ message: message.error})
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