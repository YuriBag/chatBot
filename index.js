const VK = require('vk-io');
const vk = new VK({token:"74e06880e1dc65f8817f7687a2163d027cfb70a70451e524d2f522a54f47e21415c1fb1ed2c1169b2bd21"});
const UsersModel = require("./model/users").user;



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
    if(arr[0]==="insert"){
        let data = {
            word:arr[1],
            translation:arr[2]
        };
        UsersModel.create(data,(err,res)=>{
            console.log(err);
            console.log(res);
        });

    }
    if(arr[0]==="get"){
        UsersModel.findOne({word:arr[1]},(err, doc)=>{
            console.log(err);
            console.log(doc);
            //msg.send(doc);
        })
    }

});


