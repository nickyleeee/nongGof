const express = require('express') ;
const app = express() ; 

require('dotenv').config() ; //

const line = require("@line/bot-sdk") ;

const { middleware, messagingApi } = require('@line/bot-sdk');

const config = { // set the line API parameter 
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
console.log(config) ;

//const client = new messagingApi.MessagingApiClient(config) ;

// test LINE API command  
app.post('/webhook', middleware(config), async (req, res) => {
    const events = req.body.events;

    // Process all received events
    Promise.all(events.map(handleEvent))
        .then((result) => res.json(result))
        //catch((err) => {
        //    console.error(err);
        //    res.status(500).end();
        //}
        // );
});

const client = new line.Client(config) ;

function handleEvent(event){
    console.log(event) ;
    if (event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null) ;
    }
    
    return client.replyMessage(event.replyToken,[
        /*{
            "type" : "text",
            "text" : `reply ${event.message.text}`  

        },*/
        {
            "type" : "text",
            "text" : "ครับนาย"
        }
    ]);

    
}
app.get('/', (req,res) => { res.send('im responing you when you connect me ') } ) // reply to client 

const portNo = 8090 ;
app.listen(portNo,() => console.log('start server on port on port ' + portNo.toString() ))