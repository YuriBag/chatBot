const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("localhost:27017/mydb");
mongoose.connection.on("open",()=>{console.log("you are connected to DB")});
mongoose.connection.on('error',()=>{console.error.bind(console, 'connection error:')});


let UserSchema = new Schema({

},{
    strict:false,
    versionKey:false
});
let user =  mongoose.model('User', UserSchema);


module.exports = {user};
