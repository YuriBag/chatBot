const VK = require('vk-io');
const vk = new VK({token:"74e06880e1dc65f8817f7687a2163d027cfb70a70451e524d2f522a54f47e21415c1fb1ed2c1169b2bd21"});
//const WordsModel = require("./model/words").word;
const MongoReq = require("./model/words").mongoReq;

let result;
vk.longpoll.start()
    .then(() => {
    console.log('Long Poll запущен');
})
.catch((error) => {
    console.error(error);
});
vk.longpoll.on("message",(msg)=>{
    if(-1!==msg.flags.indexOf('outbox')){
        return;
    }
   console.log(msg.text);
    let arr = msg.text.split(" ");
    console.log(arr[0]);
    if(arr[0]==="add"){
        let data = {
            word:arr[1],
            translation:arr[2]
        };
       MongoReq.addWords(data, err => {
           if(!err) msg.send("your word is added");
       });

    }
    if(arr[0]==="get"){
        let data = {
            word:arr[1]
        }
        MongoReq.getWords(data,(err, doc) => {
            if(!err) msg.send(doc.translation);
        });
    }

});


