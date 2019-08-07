const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./serviceAccountKey.json');



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), 
    databaseURL: "https://vue-blog-f1b07.firebaseio.com"
});

var db = admin.firestore();
// 포트폴리오 푸시
exports.portfolioPush = functions.firestore.document('portfolios/{any}').onCreate(event => {
    const payload = { 
        notification : {
                title: '포트폴리오가 생성되었습니다',
                body: '알림아 울려줘' 
            }
        } 
    db.collection('users').get().then((snapshot)=> {  
        snapshot.forEach(doc => {
            console.log(doc.data()['token'])
            if (doc.data()['token']){
                admin.messaging().sendToDevice(doc.data()['token'], payload) 
            }
            })
        })
    });
// 포스트 푸시
exports.postPush = functions.firestore.document('posts/{any}').onCreate(event => {
        const payload = { 
            notification : {
                    title: '포스트가 생성되었습니다',
                    body: '알림아 울려줘' 
                }
            } 
        console.log('글변경') 
        db.collection('users').get().then((snapshot)=> {  
            snapshot.forEach(doc => {
                console.log(doc.data()['token'])
                if (doc.data()['token']){
                    admin.messaging().sendToDevice(doc.data()['token'], payload) 
                }
                })
            })
    });
// 포트폴리오 댓글 푸시
exports.portfolioReplyPush = functions.firestore.document('portfolios/{any}/portfolio_replys/{anys}').onCreate(event => {
        const payload = { 
            notification : {
                    title: '포트폴리오에 댓글이 생성되었습니다',
                    body: '알림아 울려줘' 
                }
            } 
        console.log('글변경') 
        db.collection('users').get().then((snapshot)=> {  
            snapshot.forEach(doc => {
                console.log(doc.data()['token'])
                if (doc.data()['token']){
                    if(doc.data()['auth'] === 'manager'){
                        admin.messaging().sendToDevice(doc.data()['token'], payload)
                    }
                     
                }
                })
            })
    });   
// 포스트 댓글 푸시
exports.postReplyPush = functions.firestore.document('posts/{any}/post_replys/{anys}').onCreate(event => {
        const payload = { 
            notification : {
                    title: '포스트에 댓글이 생성되었습니다',
                    body: '알림아 울려줘' 
                }
            } 
        console.log('글변경') 
        db.collection('users').get().then((snapshot)=> {  
            snapshot.forEach(doc => {
                console.log(doc.data()['token'])
                if (doc.data()['token']){
                    if(doc.data()['auth'] === 'manager'){
                        admin.messaging().sendToDevice(doc.data()['token'], payload)
                    }
                     
                }
            })
    })
});   
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });