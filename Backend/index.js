import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();




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