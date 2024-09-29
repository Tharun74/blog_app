const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const userRouter = require('./routes/user')
const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://Tharun:tharun07@cluster0.8vjtb6b.mongodb.net/blogking')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({extended : true}));
app.use('/user',userRouter);

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(PORT,()=>{
    console.log("Server has started at PORT:"+PORT);
})