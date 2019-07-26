import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const POSTS = 'posts';
const PORTFOLIOS = 'portfolios';
const USERS = 'users';

// Setup Firebase
const config = {
  apiKey: 'AIzaSyBaK-tJRZvUUOHQYSTidhKMf16c5FCF_nE',
  authDomain: 'vue-blog-f1b07.firebaseapp.com',
  databaseURL: 'https://vue-blog-f1b07.firebaseio.com',
  projectId: 'vue-blog-f1b07',
  storageBucket: 'vue-blog-f1b07.appspot.com',
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

export default {
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
  getPortfolios() {
    const user = firebase.auth().currentUser;
    console.log('유저!!'); // eslint-disable-line no-console
    console.log(user); // eslint-disable-line no-console
    // const portfolioCollection = firestore.collection(USERS).doc(user.email).collection(PORTFOLIOS);
    const portfolioCollection = firestore.collection(USERS).doc('ryanlee5646@gmail.com').collection(PORTFOLIOS);
    return portfolioCollection
      .orderBy('created_at', 'desc')
      .get()
      .then(docSnapshots => docSnapshots.docs.map((doc) => {
        const data = doc.data();
        data.created_at = new Date(data.created_at.toDate());
        return data;
      }));
  },
  // 회원가입 -> 데이터베이스( 위: 용성, 아래: 규진)
  addUser(email, name) {
    alert(`[postId] ${email} ${name}`); // eslint-disable-line no-alert
    return firestore.collection(USERS).doc(email).set({
      email,
      name,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },
  // 회원가입
  signUp(signup) {
    firebase.auth().createUserWithEmailAndPassword(signup.email, signup.password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`회원가입 오류 발생 !! [Error] ${errorCode} ${errorMessage}`); // eslint-disable-line no-alert
    });

    return firestore.collection(USERS).doc(signup.email).set({
      email: signup.email,
      github: signup.github,
      name: signup.name,
      pw: signup.password,
      pwconfirmed: signup.passwordConfirmed,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },
  // 로그인
  signIn(login) {
    return firebase.auth()
      .signInWithEmailAndPassword(login.email, login.password).then((result) => {
        // let accessToken = result.credential.accessToken
        alert('[로그인 성공]'); // eslint-disable-line no-alert
        return result;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`존재하지 않는 아이디와 패스워드 입니다. ^^ [Error] ${errorCode} ${errorMessage}`); // eslint-disable-line no-alert
      });
  },

  isRegistered(email) {
    const usersCollection = firestore.collection(USERS);
    return usersCollection
      .where('email', '==', email)
      .get()
      .then(docSnapshots => docSnapshots.docs.map((doc) => {
        if (doc.exists) {
          alert('[isRegistered] 존재하는 ID 입니다.'); // eslint-disable-line no-alert
          return true;
        }
        alert('[isRegistered] 존재 하지않는 ID 입니다.'); // eslint-disable-line no-alert
        return false;
      })).catch((error) => {
        console.log('[isRegistered] Error getting document:', error); // eslint-disable-line no-console
      });
  },
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const { user } = result;
      console.log(user); // eslint-disable-line no-console
      return result;
    }).catch((error) => {
      console.error('[Google Login Error]', error); // eslint-disable-line no-console
    });
  },
  logout(obj) {
    new firebase.auth().signOut().then(() => {
      obj.$store.commit('logout');
    }).catch((error) => {
      alert(error); // eslint-disable-line no-alert
    });
  },
  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      // const { accessToken } = result.credential;
      const { user } = result; // facebook 로그인한 유저 정보
      console.log(user.email); // eslint-disable-line no-console
      return result;
    }).catch((error) => {
      console.error('[Facebook Login Error]', error); // eslint-disable-line no-console
    });
  },

  PortfolioWriter(portfolio) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return firestore.collection(USERS).doc(`${user.email}`).collection(PORTFOLIOS).add({
      portfolio,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },
  FirebaseLoginLog() {
    const nowTime = new Date();
    const logIn = '_login';
    const y = nowTime.getFullYear();
    const M = nowTime.getMonth() + 1;
    const d = nowTime.getDate();
    const h = nowTime.getHours();
    const m = nowTime.getMinutes();
    const s = nowTime.getSeconds();
    const timeId = [y, '0', M, d, h, m, s, logIn].join('');
    const Email = firebase.auth().currentUser.email;

    firestore.collection(USERS).doc(Email).collection('logHistory').doc(timeId)
      .set({
        log: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.log(`로그인 기록에 실패했습니다. ${error}`); // eslint-disable-line no-console
      });
  },

  FirebaseLogoutLog() {
    const nowTime = new Date();
    const logOut = '_logout';
    const y = nowTime.getFullYear();
    const M = nowTime.getMonth() + 1;
    const d = nowTime.getDate();
    const h = nowTime.getHours();
    const m = nowTime.getMinutes();
    const s = nowTime.getSeconds();
    const timeId = [y, '0', M, d, h, m, s, logOut].join('');
    const Email = firebase.auth().currentUser.email;


    // firestore.collection('users').doc(`${this.$store.state.user.email}`).collection('logHistory').doc(timeId).set({
    //     log: firebase.firestore.FieldValue.serverTimestamp()
    //     }).catch(error => {
    //         console.log("로그인 기록에 실패했습니다")
    // })

    firestore.collection('users').doc(Email).collection('logHistory').doc(timeId)
      .set({
        log: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.log('로그인 기록에 실패했습니다');
      });
  },
  // 유저 Gitlab Id, token 등록
  editUser(id, token) {
    console.log(`${id} ${token} EDIT`);
    const user = firebase.auth().currentUser;

    return firestore.collection(USERS).doc(user.email).set({
      gitlabID: id,
      gitlabToken: token,
    }, { merge: true });
  },
  getUserInfo() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return firestore.collection(USERS)
      .doc(user.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(`[getGitLabID]${JSON.stringify(doc.data())}`);
          return doc.data();
        }
        console.log('[getGitLabID Error] document not exists. ');
      })
      .catch((e) => {
        console.log(`[getGitLabID Error] firebase error. ${e}`);
      });
  },
};
