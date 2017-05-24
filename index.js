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
    //console.log(msg.text);
    msg.send("lav em");
});


