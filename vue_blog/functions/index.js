const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), 
    databaseURL: "https://vue-blog-f1b07.firebaseio.com"
});
var db = admin.firestore();

exports.dbWrite = functions.firestore.document('posts/{any}').onCreate(event 
=> {
    const payload = { 
        notification : {
                title: '포스트 생성되었습니다',
                body: '알림아 울려줘' 
            }
        } 
console.log('글변경')
db.collection('tokens').get().then((snapshot)=> { 
    snapshot.forEach(doc => {
        console.log(doc.data()['test_token'])
        admin.messaging().sendToDevice(doc.data()['test_token'], payload) 
        })
    }) 
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
