const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialweb')
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB', err)
})


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
        },
})


module.exports = mongoose.model('user',userSchema);