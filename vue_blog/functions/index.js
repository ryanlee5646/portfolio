const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), 
    databaseURL: "https://vue-blog-f1b07.firebaseio.com"
});
var firestore = admin.firestore();
// 포트폴리오 푸시
exports.portfolioPush = functions.firestore.document('portfolio/{any}').onCreate(event 
=> {
    const payload = { 
        notification : {
                title: '포스트 생성되었습니다',
                body: '알림아 울려줘' 
            }
        } 
    console.log('글변경') 
    firestore.collection('users').get().then((snapshot)=> {  // 로그인할때 토큰정보를 유저정보에다가 넣기
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
