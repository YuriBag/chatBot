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

let mongoReq = {
  addWords:(data, next)=>{
      word.create(data,(err,doc)=>{
          if (err) {
              console.error(err);
              return
          };
          next();
          console.log(err);
          console.log(doc);
      });
  },
    getWords:(data,next)=>{
        word.findOne(data,'translation',{lean : true},(err, doc)=>{
            if (err) return console.error(err);
            next(null, doc);
            console.log(doc);
        });
    },
    getAll:(data,next)=>{
        word.find(data,null, {lean : true},(err, doc)=>{
            if (err) return console.error(err);
            next(null, doc);
            console.log(doc);
        });
    }
}
module.exports = {mongoReq};
