import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const POSTS = 'posts';
const PORTFOLIOS = 'portfolios';
const USERS = 'users';
const PORTFOLIO_REPLYS = 'portfolio_replys'

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
    console.log('유저!!');
    console.log(user);
    // const portfolioCollection = firestore.collection(USERS).doc(user.email).collection(PORTFOLIOS);
    const portfolioCollection = firestore.collection(USERS).doc('ryanlee5646@gmail.com').collection(PORTFOLIOS);
    return portfolioCollection
      .orderBy('created_at', 'desc')
      .get()
      .then(docSnapshots => docSnapshots.docs.map((doc) => {
        const data = doc.data();
        data.created_at = new Date(data.created_at.toDate());
        data.uid = doc.id; //포트폴리오 uid
        // console.log(data.uid + " 포폴 uid");
        return data;
      }));
  },
  // 회원가입 -> 데이터베이스( 위: 용성, 아래: 규진)
  addUser(email, name, grade, photoURL, gitlabId, gitlabToken, gitlab) {
    console.log(email);
    console.log(name);
    console.log(grade);
    console.log(photoURL);
    console.log(gitlabId);
    console.log(gitlabToken);
    console.log(gitlab);
    return firestore.collection(USERS).doc(email).set({
      email,
      name,
      grade,
      photoURL,
      gitlabId,
      gitlabToken,
      gitlab,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  // 회원가입
  signUp(signup) {
    firebase.auth().createUserWithEmailAndPassword(signup.email, signup.password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`회원가입 오류 발생 !!                                                   [Error] ${errorCode} ${errorMessage}`);
    });

    firestore.collection(USERS).doc(signup.email).set({
      email: signup.email,
      name: signup.name,
      pw: signup.password,
      pwconfirmed: signup.passwordConfirmed,
      gitlabId: signup.gitlabId,
      gitlabToken: signup.gitlabToken,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },
  addGitlabInfo(gitlab){
    const user = firebase.auth().currentUser;
    const gitlabRef = firestore.collection("users").doc(user.email);
    return gitlabRef.update({
      gitlabId : gitlab.gitlabId,
      gitlabToken : gitlab.gitlabToken,
      gitlab : true
      }).then((result) => {
      console.log("atfer update",result)
    })
  },

  // async checkGitlabInfo(){
  //   // Gitlab 정보가 있는지 체크
  //   const user = firebase.auth().currentUser;
  //   const gitlabRef = firestore.collection("users").doc(user.email);
  //   let gitlabInfo = await gitlabRef.get()
        
  //   if (gitlabInfo.exists) {
  //     const data = gitlabInfo.data();
  //     console.log("data",data)
  //     console.log(data.gitlabId, data.gitlabToken,"gitlab")
  //     if ((data.gitlabId === "" || data.gitlabToken === "") && data.gitlab === false){   // 나중에 조건에 gilab true false 추가
  //       this.gitlabQuestion = true;
  //     }
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // },
  // 로그인
  signIn(login) {
    return firebase.auth().signInWithEmailAndPassword(login.email, login.password).then((result) => {
      // let accessToken = result.credential.accessToken
      const {
        user
      } = result;
      alert('[로그인 성공]');
      return result;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`존재하지 않는 아이디와 패스워드 입니다. ^^                               [Error] ${errorCode} ${errorMessage}`);
    });
  },


  isRegistered(email) {
    const usersCollection = firestore.collection(USERS);
    return usersCollection
      .get()
      .then(function (querySnapshot) {
        return querySnapshot.docs.every(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          if (doc.id === email) {
            alert(doc.id+ "/"+ email)
            return false;
          }
          return true;
        })
      });
  },
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const {
        accessToken
      } = result.credential;
      const {
        user
      } = result;
      console.log(user);
      return result;
    }).catch((error) => {
      console.error('[Google Login Error]', error);
    });
  },
  logout(obj) {
    new firebase.auth().signOut().then(() => {
      obj.$store.commit('logout');
    }).catch((error) => {
      alert(error);
    });
  },
  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const {
        accessToken
      } = result.credential;
      const {
        user
      } = result; // facebook 로그인한 유저 정보
      console.log(user.email);
      return result;
    }).catch((error) => {
      console.error('[Facebook Login Error]', error);
    });
  },
  // 포트폴리오 댓글 작성
  PortfolioReply(portfolioReply, portfolioUID) {
    // portfolioUID - 현재 선택한 포트폴리오의 uid - p8WgVvAYp7C546Ev4frP
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    const portfolioCollection = firestore.collection(USERS).doc(user.email);
    var userEmail = firebase.auth().currentUser.email;
    var email = userEmail.split('@');
    // console.log( email[0] + " "+ portfolioReply + " !!!!");
    portfolioReply.email = email[0]; //유저의 이메일에서 아이디만 저장
    // console.log(portfolioCollection + " @@@@@@@@@@@@@@@@@@@@@");
    return firestore.collection(USERS).doc(`${user.email}`).collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS).add({
      portfolioReply,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  getPortfolioReply(portfolioUID) {
    let user = firebase.auth().currentUser
    // let user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("댓글 가져오기!!");
    const replyCollection = firestore.collection(USERS).doc(user.email).collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS);

    // console.log(replyCollection.content + " 댓글 옴??@?@?@?@?@?@?@?");
    return replyCollection
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.uid = doc.id;
          // console.log(data.uid + " 여긴가여");
          return data;
        })
      })
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

    if (firestore.collection(USERS).doc(Email)) {
      firestore.collection(USERS).doc(Email).collection('logHistory').doc(timeId)
        .set({
          log: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((error) => {
          console.log(`로그인 기록에 실패했습니다. ${error}`); // eslint-disable-line no-console
        });
    }
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
    if (firestore.collection(USERS).doc(Email)) {
      firestore.collection(USERS).doc(Email).collection('logHistory').doc(timeId)
        .set({
          log: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((error) => {
          console.log('로그인 기록에 실패했습니다');
        });
    }
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
  getAllUserInfo() {
    return firestore.collection(USERS).get()
      .then(function (querySnapshot) {
        var users = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          users.push(doc.data());
        });
        return users;
      });
  }
};
