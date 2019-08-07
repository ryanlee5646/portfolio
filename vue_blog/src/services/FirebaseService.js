import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';

const POSTS = 'posts';
const VIEWS = 'views';
const PORTFOLIOS = 'portfolios';
const USERS = 'users';
const PORTFOLIO_REPLYS = 'portfolio_replys';
const LOGHISTORY = 'logHistory';
// Setup Firebase
const config = {
    apiKey: 'AIzaSyBaK-tJRZvUUOHQYSTidhKMf16c5FCF_nE',
    authDomain: 'vue-blog-f1b07.firebaseapp.com',
    databaseURL: 'https://vue-blog-f1b07.firebaseio.com',
    projectId: 'vue-blog-f1b07',
    storageBucket: 'vue-blog-f1b07.appspot.com',
    messagingSenderId: '1084798491757',
    appId: '1:1084798491757:web:0f3fe9dbe280e6f7'
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BE71GiStXCZkedHmFGZLNsz7vP1bETIPB9Oiz8cd7s0aDepoiht_xoxcXPPZpFEeIvaA1l6pRgcaQLVw8cqG2Kc');

// 화면을 보고 있을 때 푸쉬알림
messaging.onMessage((payload) => {
    alert('Message received ' + payload.notification.title)
})

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

  /* login & logout */
  signUp(signup) {
    console.log('[info] start signUp func()');
    const nickName = signup.email.split('@')[0];

    firebase.auth().createUserWithEmailAndPassword(signup.email, signup.password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`[error] signUp func() : [CODE ${errorCode}] Error : ${errorMessage}`);
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
          alert('[오류] 비밀번호가 올바르지 않습니다.'); // eslint-disable-line no-alert
        } else {
          console.log(`[error] fail singIn : [CODE ${errorCode}] Error : ${errorMessage}`);
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

  /* Reply
    Create : PortfolioReply();
    Update : editReply();
    Read : getPortfolioReply();
    Delete : deleteReply();
  */

  PortfolioReply(portfolioReply, portfolioUID) {
    console.log('[info] start PortfolioReply func()');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const portfolioCollection = firestore.collection(PORTFOLIOS);
    portfolioReply.email = user.nickName; // eslint-disable-line
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
  editReply(portfolioUID, replyUID, editReplyContent, email) {
    console.log('[info] start editReply func()');
    const portfolioRef = firestore.collection(PORTFOLIOS).doc(portfolioUID);
    const replyCollection = portfolioRef.collection(PORTFOLIO_REPLYS);
    replyCollection.doc(replyUID).update({
      portfolioReply: {
        content: editReplyContent,
        email,
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
    return firestore.collection(POSTS).add({
      post,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`[error] PostoWriter func() : [CODE ${errorCode}] Error : ${errorMessage}`);
    });
  },

  editPost() {
    console.log('[info] start editPost func()');
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
          return data
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`[error] getPosts func() : [CODE ${errorCode}] Error : ${errorMessage}`);
      });
  },

  deletePost() {
    console.log('[info] start deletePost func()');
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
    alert("노티피케이션")
    Notification.requestPermission().then(function(permission) {
      if(permission === 'granted') {
        console.log("알림이 허용됨")
      } else{
        console.log("알림이 거부됨")
      }
    })
  },
  // 로그인시 토큰 얻기
    gettingToken() {
        messaging.getToken().then(function(currentToken){
          const Email = firebase.auth().currentUser.email;
          if (currentToken) {
          var test_token = currentToken
          alert(test_token)
          firestore.collection(USERS).doc(Email).collection('tokens').doc(test_token).set({
            test_token : test_token
          })
          } else {
            console.log("No Instance ID token availabe")
          }
      }).catch(function(err){
      console.log("An error occurred while retrieving token", err);
    })
  },

  outToken(user){
    messaging.getToken().then(function(currentToken){
      const Email = user.email;
      if (currentToken) {
        var test_token = currentToken
        console.log(test_token)
        firestore.collection(USERS).doc(Email).collection('tokens').doc(test_token).delete()
      } else {
        console.log("No Instance ID token available. Request permission to generate one.");
      }
    }).catch(function(err){
      console.log("An error occurred while retrieving token", err)
    })
  }
}; // eslint-disable-line
