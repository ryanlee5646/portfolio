import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';
import store from '../store';

const POSTS = 'posts';
const VIEWS = 'views';
const PORTFOLIOS = 'portfolios';
const USERS = 'users';
const PORTFOLIO_REPLYS = 'portfolio_replys';
const POST_REPLYS = 'post_replys';
const LOGHISTORY = 'logHistory';
// Setup Firebase
const config = {
  apiKey: 'AIzaSyBaK-tJRZvUUOHQYSTidhKMf16c5FCF_nE',
  authDomain: 'vue-blog-f1b07.firebaseapp.com',
  databaseURL: 'https://vue-blog-f1b07.firebaseio.com',
  projectId: 'vue-blog-f1b07',
  storageBucket: 'vue-blog-f1b07.appspot.com',
  messagingSenderId: '1084798491757',
  appId: '1:1084798491757:web:0f3fe9dbe280e6f7',
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BE71GiStXCZkedHmFGZLNsz7vP1bETIPB9Oiz8cd7s0aDepoiht_xoxcXPPZpFEeIvaA1l6pRgcaQLVw8cqG2Kc');

// 화면을 보고 있을 때 푸쉬알림
messaging.onMessage((payload) => {
  console.log('[info11]', payload);
  console.log('[info22]', payload.notification.title);
  console.log('[info33]', payload.notification.body);
  console.log('[info44]', payload.data.link);
  console.log('[info55]', payload.data.email);

  store.commit('setPush', {
    title: `${payload.notification.title}`,
    message: `${payload.notification.body}`,
    email: `${payload.data.email}님이 `,
    link: `${payload.data.link}`,
  });
});

export default {
    /* POST */
    // getPosts() {
    //     const postsCollection = firestore.collection(POSTS)
    //     return postsCollection
    //         .orderBy('created_at', 'desc')
    //         .get()
    //         .then((docSnapshots) => {
    //             return docSnapshots.docs.map((doc) => {
    //                 let data = doc.data()
    //                 data.created_at = new Date(data.created_at.toDate())
    //                 return data
    //             })
    //         })
    // },
    // postPost(title, body) {
    //     return firestore.collection(POSTS).add({
    //         title,
    //         body,
    //         created_at: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    // },
    /* User */
    addUser(email, name, auth, photoURL, gitlabID, gitlabToken, gitlabAllow) {
        console.log('[info] start addUser func()');
        const nickName = email.split('@')[0];
        return firestore.collection(USERS).doc(email).set({
            email,
            nickName,
            name,
            auth,
            photoURL,
            gitlabID,
            gitlabToken,
            gitlabAllow,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
    getUserInfo() {
        console.log('[info] start getUserInfo func()');
        let user = firebase.auth().currentUser;
        if (user === null) {
            user = JSON.parse(localStorage.getItem('user') || '{}');
        }

        return firestore.collection(USERS).doc(user.email)
            .get()
            .then((doc) => {
                let data = null;
                if (doc.exists) {
                    data = doc.data();
                } else {
                    console.log('[error] doc does not exist.');
                }
                return data;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail FirebaseLogoutLog : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getAllUserInfo() {
        return firestore.collection(USERS).get()
            .then(function(querySnapshot) { // eslint-disable-line
                let users = []; // eslint-disable-line
                querySnapshot.forEach(function(doc) { // eslint-disable-line
                    users.push(doc.data());
                });
                return users;
            });
    },
    getMemberUser() {
        return firestore.collection(USERS).get()
            .then(function(querySnapshot) { // eslint-disable-line
                let users = []; // eslint-disable-line
                querySnapshot.forEach(function(doc) { // eslint-disable-line
                    if (doc.data().auth === 'team' || doc.data().auth === 'manager') {
                        users.push(doc.data());
                    }
                });
                return users;
            });
    },

    /* login & logout */
    signUp(signup) {
        console.log('[info] start signUp func()');
        const nickName = signup.email.split('@')[0];

        firebase.auth().createUserWithEmailAndPassword(signup.email, signup.password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] signUp func() : [CODE ${errorCode}] Error : ${errorMessage}`);
                store.commit('setError', { type: 'error', code: '회원가입 오류', message: ' 예기치않은 오류로 인해 회원가입에 실패했습니다.' });
            });

        firestore.collection(USERS).doc(signup.email).set({
            email: signup.email,
            nickName,
            name: signup.name,
            auth: 'visitor',
            photoURL: 'https://pondokindahmall.co.id/assets/img/default.png',
            gitlabID: signup.gitlabID,
            gitlabToken: signup.gitlabToken,
            gitlabAllow: false,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
    signIn(login) {
        return firebase.auth().signInWithEmailAndPassword(login.email, login.password)
            .then((result) => {
                console.log('[info] success singIn');
                return result;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    store.commit('setError', { type: 'error', code: '비밀번호 오류', message: ' 비밀번호가 올바르지 않습니다. 다시 한번 입력해주세요.' });
                } else if (errorCode === 'auth/user-not-found') {
                    store.commit('setError', { type: 'error', code: '아이디 오류', message: ' 아이디가 존재하지 않습니다. 회원 가입을 진행해 주세요.' });
                } else {
                    console.log(`[error] fail singIn : [CODE ${errorCode}] Error : ${errorMessage}`);
                    store.commit('setError', { type: 'error', code: errorCode, message: errorMessage });
                }
            });
    },
    signOut() {
        let user = firebase.auth().currentUser;
        if (user === null) {
            user = JSON.parse(localStorage.getItem('user') || '{}');
        }
        return firebase.auth().signOut().then(() => {
            console.log('[info] success signOut');
            this.FirebaseLogoutLog(user.email);
            this.outToken(user);

            return true;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] fail signOut : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },
    loginWithGoogle() {
        console.log('[info] start loginWithGoogle func()');
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail loginWithGoogle : [CODE ${errorCode}] Error : ${errorMessage}`);
                store.commit('setError', {
                    type: 'error',
                    code: errorCode,
                    message: errorMessage
                });
            });
    },
    loginWithFacebook() {
        console.log('[info] start loginWithFacebook func()');
        const provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail loginWithFacebook : [CODE ${errorCode}] Error : ${errorMessage}`);
                store.commit('setError', {
                    type: 'error',
                    code: errorCode,
                    message: errorMessage
                });
            });
    },
    addGitlabInfo(gitlab) {
        console.log('[info] start addGitlabInfo func()');
        let user = firebase.auth().currentUser;
        if (user === null) {
            user = JSON.parse(localStorage.getItem('user') || '{}');
        }
        firestore.collection(USERS).doc(user.email).update({
            gitlabID: gitlab.gitlabID,
            gitlabToken: gitlab.gitlabToken,
            gitlabAllow: true,
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] fail addGitlabInfo : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },
    isRegistered(email) {
        console.log('[info] start isRegistered func()');
        return firestore.collection(USERS).get()
            .then(function(querySnapshot) { // eslint-disable-line
                return querySnapshot.docs.every(function(doc) { // eslint-disable-line
                    if (doc.id === email) {
                        return false;
                    }
                    return true;
                });
            });
    },

    /* PortfolioReply
      Create : PortfolioReply();
      Update : editReply();
      Read : getPortfolioReply();
      Delete : deleteReply();
    */

    PortfolioReply(portfolioReply, portfolioUID) {
        console.log('[info] start PortfolioReply func()');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const portfolioCollection = firestore.collection(PORTFOLIOS);
        portfolioReply.email = user.email; // eslint-disable-line
        portfolioReply.nickName = user.nickName;
        portfolioReply.photoURL = user.photoURL;
        return portfolioCollection.doc(portfolioUID).collection(PORTFOLIO_REPLYS).add({
            portfolioReply,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] PortfolioReply func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },
    getPortfolioReply(portfolioUID) {
        console.log('[info] start getPortfolioReply func()');
        const portfolioCollection = firestore.collection(PORTFOLIOS);
        const replyCollection = portfolioCollection.doc(portfolioUID).collection(PORTFOLIO_REPLYS);

        return replyCollection
            .orderBy('created_at', 'desc')
            .get()
            .then((docSnapshots) => { // eslint-disable-line
                return docSnapshots.docs.map((doc) => {
                    let data = doc.data(); // eslint-disable-line
                    data.created_at = new Date(data.created_at.toDate());
                    data.uid = doc.id;
                    return data;
                });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] getPortfolioReply func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    deleteReply(portfolioUID, replyUID) {
        console.log('[info] start deleteReply func()');
        const portfolioCollection = firestore.collection(PORTFOLIOS);
        const replyCollection = portfolioCollection.doc(portfolioUID).collection(PORTFOLIO_REPLYS);
        replyCollection.doc(replyUID)
            .delete()
            .then(() => {
                console.log('[info] Reply successfully deleted.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] deleteReply func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    editReply(portfolioUID, replyUID, editReplyContent) {
        console.log('[info] start editReply func()');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        // console.log(nickName);
        const portfolioRef = firestore.collection(PORTFOLIOS).doc(portfolioUID);
        const replyCollection = portfolioRef.collection(PORTFOLIO_REPLYS);
        replyCollection.doc(replyUID).update({
            portfolioReply: {
                content: editReplyContent,
                email: user.email,
                nickName: user.nickName,
                photoURL: user.photoURL
            },
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] editReply func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },

    /* Portfolio
      Create : PortfolioWriter();
      Update : editPortfolio();
      Read : getPortfolios();
      Delete : deletePortfolio();
    */

    PortfolioWriter(portfolio) {
        console.log('[info] start PortfolioWriter func()');
        return firestore.collection(PORTFOLIOS).add({
            portfolio,
            views: 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] PortfolioWriter func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },
    deletePortfolio(portfolioUID) {
        console.log('[info] start deletePortfolio func()');
        const portfolioCollection = firestore.collection(PORTFOLIOS).doc(portfolioUID);
        portfolioCollection.delete()
            .then(() => {
                console.log('[info] Document successfully deleted.');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] PortfolioWriter func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    editPortfolio(portfolioUID, portfolio) {
        console.log('[info] start editPortfolio func()');
        firestore.collection(PORTFOLIOS).doc(portfolioUID)
            .update({
                portfolio,
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] editPortfolio func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getPortfolios() {
        console.log('[info] start getPortfolios func()');
        const portfolioCollection = firestore.collection(PORTFOLIOS);
        return portfolioCollection
            .orderBy('created_at', 'desc')
            .get()
            .then(docSnapshots => docSnapshots.docs.map((doc) => {
                const data = doc.data();
                data.created_at = new Date(data.created_at.toDate());
                data.uid = doc.id; // Portfolio uid
                return data;
            })).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] getPortfolios func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    addPortfoliosViews(portfolioID) {
        console.log('[info] start addPortfoliosViews func()');
        const portfolioCollection = firestore.collection(PORTFOLIOS).doc(portfolioID);

        portfolioCollection.update({
            views: firebase.firestore.FieldValue.increment(1),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] addPortfoliosViews func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },

    /* Post
      Create : PostWriter();
      Update : editPost();
      Read : getPosts();
      Delete : deletePost();
    */
    PostWriter(post) {
        console.log('[info] start PostoWriter func()');
        console.log(post);
        var d = new Date().getMonth();
        // console.log(d);
        console.log("time!!");
        console.log(new Date().toLocaleString());
        return firestore.collection(POSTS).add({
            post,
            views: 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            writerTime: new Date().toLocaleString(),
            // writerTime : firebase.firestore.FieldValue.serverTimestamp().split(" ")[0]
            //firebase.firestore.Timestamp.fromDate(new Date());
            //firebase.firestore.FieldValue.serverTimestamp(),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] PostoWriter func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },

    editPost(postUID, post) {
        console.log('[info] start editPost func()');

        firestore.collection(POSTS).doc(postUID)
            .update({
                post,
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] editPost func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },

    getPosts() {
        console.log('[info] start getPosts func()');
        const postsCollection = firestore.collection(POSTS);
        console.log(postsCollection);

        return postsCollection
            .orderBy('created_at', 'desc')
            .get()
            .then((docSnapshots) => {
                return docSnapshots.docs.map((doc) => {
                    let data = doc.data()
                    data.created_at = new Date(data.created_at.toDate())
                    data.uid = doc.id; // Post uid
                    return data
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] getPosts func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },

    deletePost(postUID) {
        console.log('[info] start deletePost func()');
        const postCollection = firestore.collection(POSTS).doc(postUID);

        postCollection.delete()
            .then(() => {
                console.log('[info] Document successfully deleted.');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] postCollection func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });

    },

    addPostViews(postID) {
        console.log('[info] start addPostViews func()');
        const postCollection = firestore.collection(POSTS).doc(postID);

        postCollection.update({
            views: firebase.firestore.FieldValue.increment(1),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] addPostViews func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },

    searchPost(selected, inputStr) {
        console.log('[info] start searchPost func()');
        const postsCollection = firestore.collection(POSTS).doc();
        const searchedPost = new Array;

        if (selected == 'title') {
            // console.log("title!!");
            firestore.collection(POSTS)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // console.log(doc.id, " => ", doc.data());
                        if (doc.data().post.title.includes(inputStr)) {
                            const data = doc.data();
                            data.created_at = new Date(data.created_at.toDate());
                            data.uid = doc.id;

                            searchedPost.push(data);
                        }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

        } else if (selected == 'id') {
            // console.log('search ID!!');
            firestore.collection(POSTS)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if (doc.data().post.userID.includes(inputStr)) {
                            searchedPost.push(doc.data());
                        }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }

        return searchedPost;
    },


    /* PostReply
      Create : PostReplyWriter();
      Update : editPostReply();
      Read : getPostReplys();
      Delete : deletePostReply();
    */

    PostReplyWriter(postReply, postUID) {
        console.log('[info] start PostReplyWriter func()');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const postCollection = firestore.collection(POSTS);
        postReply.email = user.email; // eslint-disable-line
        postReply.nickName = user.nickName;
        postReply.photoURL = user.photoURL;
        return postCollection.doc(postUID).collection(POST_REPLYS).add({
            postReply,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] PostReplyWriter func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },

    editPostReply(postUID, replyUID, editReplyContent) {
        console.log('[info] start editPostReply func()');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const postRef = firestore.collection(POSTS).doc(postUID);
        const replyCollection = postRef.collection(POST_REPLYS);
        replyCollection.doc(replyUID).update({
            postReply: {
                content: editReplyContent,
                email: user.email,
                nickName: user.nickName,
                photoURL: user.photoURL
            },
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`[error] editReply func() : [CODE ${errorCode}] Error : ${errorMessage}`);
        });
    },

    getPostReplys(postUID) {
        console.log('[info] start getPostReplys func()');

        const postCollection = firestore.collection(POSTS);
        const replyCollection = postCollection.doc(postUID).collection(POST_REPLYS);

        return replyCollection
            .orderBy('created_at', 'desc')
            .get()
            .then((docSnapshots) => {
                return docSnapshots.docs.map((doc) => {
                    let data = doc.data();
                    data.created_at = new Date(data.created_at.toDate());
                    data.uid = doc.id;
                    return data;
                });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] getPostReplys func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });

    },
    deletePostReply(postUID, replyUID) {
        console.log('[info] start deletePostReply func()');
        const postCollection = firestore.collection(POSTS);
        const replyCollection = postCollection.doc(postUID).collection(POST_REPLYS);
        replyCollection.doc(replyUID)
            .delete()
            .then(() => {
                console.log('[info] Reply successfully deleted.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] deletePostReply func() : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },

    /* Log */
    FirebaseLoginLog() {
        console.log('[info] start FirebaseLoginLog func()');
        const nowTime = new Date();
        const logIn = '_login';
        const y = nowTime.getFullYear();
        const M = nowTime.getMonth() + 1;
        const d = nowTime.getDate();
        const h = nowTime.getHours();
        const m = nowTime.getMinutes();
        const s = nowTime.getSeconds();
        const timeID = [y, '0', M, d, h, m, s, logIn].join('');
        const Email = firebase.auth().currentUser.email;

        firestore.collection(USERS).doc(Email).collection(LOGHISTORY).doc(timeID)
            .set({
                log: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail FirebaseLoginLog : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    FirebaseLogoutLog(email) {
        console.log('[info] start FirebaseLogoutLog func()');
        const nowTime = new Date();
        const logOut = '_logout';
        const y = nowTime.getFullYear();
        const M = nowTime.getMonth() + 1;
        const d = nowTime.getDate();
        const h = nowTime.getHours();
        const m = nowTime.getMinutes();
        const s = nowTime.getSeconds();
        const timeID = [y, '0', M, d, h, m, s, logOut].join('');

        firestore.collection(USERS).doc(email).collection(LOGHISTORY).doc(timeID)
            .set({
                log: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail FirebaseLogoutLog : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    /* Views */
    getUserPortfolioNumber(email) {
        console.log('[info] start getUserPortfolioNumber func()');
        return firestore.collection(PORTFOLIOS).where('portfolio.userID', '==', email).get()
            .then(function(querySnapshot) { // eslint-disable-line
                return querySnapshot.size;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getUserPortfolioNumber : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getUSerPostNumber(email) {
        console.log('[info] start getUSerPostNumber func()');
        return firestore.collection(POSTS).where('post.userID', '==', email).get()
            .then(function(querySnapshot) { // eslint-disable-line
                return querySnapshot.size;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getUSerPostNumber : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getUserReplyNumber(email) {
        console.log('[info] start getUSerReplyNumber func()'); // .where('post.userID', '==', nickName)
        return firestore.collection(PORTFOLIOS).get()
            .then(async(querySnapshot) => { // eslint-disable-line
                let replySum = 0;
                for (let i = 0; i < querySnapshot.size; i += 1) {
                    replySum += await this.getUserReplyCountByPortfolio(querySnapshot.docs[i].id, email); // eslint-disable-line
                }
                return replySum;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getUSerReplyNumber : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getUserReplyCountByPortfolio(portfolioID, email) {
        // console.log('[info] start getUserReplyCountByPortfolio func()');
        return firestore.collection(PORTFOLIOS).doc(portfolioID).collection(PORTFOLIO_REPLYS).get()
            .then(function(querySnapshot) { // eslint-disable-line
                let cnt = 0;
                for (let j = 0; j < querySnapshot.size; j += 1) {
                    if (querySnapshot.docs[j].data().portfolioReply.userID === email) {
                        cnt += 1;
                    }
                }
                return cnt;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getUserReplyCountByPortfolio : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getPortfolioNumber() {
        console.log('[info] start getPortfolioNumber func()');
        return firestore.collection(PORTFOLIOS).get()
            .then(function(querySnapshot) { // eslint-disable-line
                return querySnapshot.size;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getPortfolioNumber : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getPostNumber() {
        console.log('[info] start getPostNumber func()');
        return firestore.collection(POSTS)
            .get()
            .then(function(querySnapshot) { // eslint-disable-line
                return querySnapshot.size;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getPostNumber : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    addViews() {
        console.log('[info] start addViews func()');
        let d = new Date();
        d = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        const usersCollection = firestore.collection(VIEWS);
        return usersCollection.doc(d).get()
            .then((doc) => {
                let views = 0;
                if (doc.exists) {
                    views = doc.data().views + 1;
                    usersCollection.doc(d).set({
                        views,
                    });
                } else {
                    console.log('[error] No such document.');
                    usersCollection.doc(d).set({
                        views,
                    });
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail addViews : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    getViews() {
        console.log('[info] start getViews func()');
        let d = new Date();
        d = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        const usersCollection = firestore.collection(VIEWS);
        return usersCollection.doc(d)
            .get()
            .then((doc) => {
                let views = -1;
                if (doc.exists) {
                    views = doc.data().views; // eslint-disable-line
                } else {
                    console.log('[error] No such document.');
                }
                return views;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail getViews : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },
    updateAuth(email, auth) {
        console.log('[info] start updateAuth func()');
        const userRef = firestore.collection(USERS).doc(email);
        return userRef.update({
                auth
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`[error] fail updateAuth : [CODE ${errorCode}] Error : ${errorMessage}`);
            });
    },

    // push_notification check
    notificationCheck() {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log("[info] 알림이 허용됨")
            } else {
                console.log("[info] 알림이 거부됨")
            }
        })
    },
    // 로그인시 토큰 얻기
    gettingToken() {
        messaging.getToken().then(function(currentToken) {
            const Email = firebase.auth().currentUser.email;
            if (currentToken) {
                var test_token = currentToken
                console.log(`[info] gettingToken func() [token : ${test_token}]`)
                firestore.collection(USERS).doc(Email).update({
                    token: test_token
                })
            } else {
                console.log("No Instance ID token availabe")
            }
        }).catch(function(err) {
            console.log("An error occurred while retrieving token", err);
        })
    },
    outToken(user) {
        messaging.getToken().then(function(currentToken) {
            const Email = user.email;
            if (currentToken) {
                var test_token = currentToken
                console.log(test_token)
                firestore.collection(USERS).doc(Email).update({
                    token: ''
                })
            } else {
                console.log("No Instance ID token available. Request permission to generate one.");
            }
        }).catch(function(err) {
            console.log("An error occurred while retrieving token", err)
        })
    }
}; // eslint-disable-line