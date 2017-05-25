const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://admin:admin@ds113630.mlab.com:13630/heroku_w4dbsbht");
mongoose.connection.on("open",()=>{console.log("you are connected to DB")});
mongoose.connection.on('error',()=>{console.error.bind(console, 'connection error:')});


let WordsSchema = new Schema({

},{
    strict:false,
    versionKey:false
});
let word =  mongoose.model('Words', WordsSchema);


module.exports = {word};
