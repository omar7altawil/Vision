'use strict';

// =================================================================================
// Firebase
// =================================================================================
var admin = require("firebase-admin");
var serviceAccount = require("/home/omar/Desktop/vision/vision/vision-6855f-firebase-adminsdk-vnr1u-1485412502.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vision-6855f.firebaseio.com"
});
var room="Al yasat hall"
var db = admin.database();


// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);

// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.ask("Welcome to vision app,let me be your vision","how can i help you?")  
    
        },
    'DescribeIntent':async function() {
        var ref = db.ref('/'+room+"/DDescrption");
        var Descrption=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
        this.tell("Right now you are in the "+room+" inside the khalifha award building, "+Descrption,"can i help you with something else?")
    },
    'CountIntent':async function() {
        var ref = db.ref('/'+room+"/count");
        var count=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
        this.tell("Right now you are in the "+room+"I can see , "+count+" pepole in the room","can i help you with something else?")
    },
});
module.exports.app = app;
