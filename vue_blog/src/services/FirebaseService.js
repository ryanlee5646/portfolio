import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const POSTS = 'posts';
const VIEWS = 'views';
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
        // const user = firebase.auth().currentUser;
        // console.log('유저!!');
        // console.log(user);

        // const portfolioCollection = firestore.collection(USERS).doc(user.email).collection(PORTFOLIOS);
        const portfolioCollection = firestore.collection(PORTFOLIOS);
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
    getAllPortfolios() {
        console.log(firestore.collection(USERS).doc(users).id + "  전체 유저 정보 가져오기");
        // const portfolioCollection = firestore.collection(USERS).doc(user.email).collection(PORTFOLIOS);
    },
    addPortfoliosCount(portfolioID) {
        console.log(portfolioID + "  addPortfoliosCount@@@@@@");
        const portfolioCollection = firestore.collection(PORTFOLIOS).doc(portfolioID);

        portfolioCollection.update({
            viewCount: firebase.firestore.FieldValue.increment(1)
        });
        // portfolioCollection.update({
        //   viewCount :  parseInt(viewCount) + 1
        // })
        // .then(function() {
        //     console.log("Document successfully updated!");
        // })
        // .catch(function(error) {
        //     console.error("Error updating document: ", error);
        // });

        // portfolioCollection.get()
        //   .then(doc => {
        //     if (!doc.exists) {
        //       console.log('No such document!');
        //     } else {
        //       console.log('Document data:', doc.data());
        //       console.log(doc.data().portfolio.viewCount);
        //       doc.data().portfolio.viewCount ++;
        //     }
        //   })
        //   .catch(err => {
        //     console.log('Error getting document', err);
        //   });

    },
    // 회원가입 -> 데이터베이스( 위: 용성, 아래: 규진)
    addUser(email, name, auth, photoURL) {
        //alert("[addUser Info] : " + email + " " + name)
        var temp = email.split('@');
        return firestore.collection(USERS).doc(email).set({
            email,
            name,
            userID,
            auth,
            photoURL,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
    },
    // 회원가입
    signUp(signup) {
        firebase.auth().createUserWithEmailAndPassword(signup.email, signup.password).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`회원가입 오류 발생 !!                                                   [Error] ${errorCode} ${errorMessage}`);
        });

        return firestore.collection(USERS).doc(signup.email).set({
            email: signup.email,
            github: signup.github,
            name: signup.name,
            pw: signup.password,
            pwconfirmed: signup.passwordConfirmed,
            // portfolioCount : 0,
            // postCount : 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
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
            .where('email', '==', email)
            .get()
            .then(docSnapshots => docSnapshots.docs.map((doc) => {
                if (doc.exists) {
                    alert('[isRegistered] 존재하는 ID 입니다.');
                    return true;
                }
                alert('[isRegistered] 존재 하지않는 ID 입니다.');
                return false;
            })).catch((error) => {
                console.log('[isRegistered] Error getting document:', error);
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
            // var temp = user.email.split('@');
            // user.userID = temp[0];
            console.log(user.userID + " loginWithGoogle");
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
        const portfolioCollection = firestore.collection(PORTFOLIOS);
        var userEmail = firebase.auth().currentUser.email;
        var email = userEmail.split('@');

        // console.log( email[0] + " "+ portfolioReply + " !!!!");
        portfolioReply.email = email[0]; //유저의 이메일에서 아이디만 저장
        // console.log(portfolioCollection + " @@@@@@@@@@@@@@@@@@@@@");
        return portfolioCollection.doc(portfolioUID).collection(PORTFOLIO_REPLYS).add({
            portfolioReply,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
    },
    getPortfolioReply(portfolioUID) {
        let user = firebase.auth().currentUser
            // let user = JSON.parse(localStorage.getItem("user") || "{}");\
        const portfolioCollection = firestore.collection(PORTFOLIOS);
        console.log("댓글 가져오기!!");
        const replyCollection = portfolioCollection.doc(portfolioUID).collection(PORTFOLIO_REPLYS);
        // console.log(replyCollection.content + " 댓글 옴??@?@?@?@?@?@?@?");

        return replyCollection
            .get()
            .then((docSnapshots) => {
                return docSnapshots.docs.map((doc) => {
                    let data = doc.data();
                    data.created_at = new Date(data.created_at.toDate());
                    data.uid = doc.id;
                    // this.$store.commit('updatePortfolioReplys', data);
                    // console.log(data.uid + " 여긴가여");
                    return data;
                })
            })
    },
    // 댓글 삭제
    deleteReply(index, portfolioUID, replyUID) {
        console.log("deleteReply!!");
        let user = firebase.auth().currentUser
        const replyCollection = firestore.collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS);
        // console.log(index + "인덱스 " + replyCollection);
        // console.log(JSON.stringify(replyCollection[0]));
        firestore.collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS).doc(replyUID)
            .delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error(error);
            })
            // );
    },
    editReply(index, portfolioUID, replyUID, editReplyContent, email) {
        console.log("editReply!!");
        let user = firebase.auth().currentUser;
        // const replyCollection = firestore.collection(USERS).doc(user.email).collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS);
        //.portfolioReply.content
        console.log(firestore.collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS).doc(replyUID) + " @@@@");
        // .update({
        //   "content" : editReplyContent
        // });
        // portfolioReply
        firestore.collection(PORTFOLIOS).doc(portfolioUID).collection(PORTFOLIO_REPLYS).doc(replyUID)
            .update({
                "portfolioReply": {
                    "content": editReplyContent,
                    "email": email
                }
            });
    },

    PortfolioWriter(portfolio) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        //console.log(JSON.stringify(user) + " ????????????????");
        return firestore.collection(PORTFOLIOS).add({
            portfolio,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
    deletePortfolio(portfolioUID) {
        console.log("deletePortfolio!!");
        const portfolioCollection = firestore.collection(PORTFOLIOS).doc(portfolioUID)
            .delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error(error);
            });
    },

    editPortfolio(portfolioUID, portfolio) {
        console.log("editPortfolio!!");
        let user = firebase.auth().currentUser;
        console.log(firestore.collection(PORTFOLIOS).doc(portfolioUID) + " @@@@");
        // .update({
        //   "content" : editReplyContent
        // });
        console.log(portfolio);
        firestore.collection(PORTFOLIOS).doc(portfolioUID)
            .update({
                "portfolio": {
                    "content": portfolio.content,
                    "edate": portfolio.edate,
                    "sdate": portfolio.sdate,
                    "teams": portfolio.teams,
                    "thumbnail": portfolio.thumbnail,
                    "title": portfolio.title,
                    "userID": portfolio.userID,
                    "startdate": portfolio.startdate,
                    "enddate": portfolio.enddate,
                    "startdate": portfolio.startdate,

                }
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
    getAllUserInfo() {
        return firestore.collection(USERS).get()
            .then(function(querySnapshot) {
                var users = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    users.push(doc.data());
                });
                return users;
            });
    },
    getPortfolioNumber() {
        return firestore.collection(PORTFOLIOS)
            .get()
            .then(function(querySnapshot) {
                return querySnapshot.size;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    },
    getPostNumber() {
        return firestore.collection(USERS)
            .get()
            .then(function(querySnapshot) {
                var totalCount = 0;
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    if (doc.data().portfolioCount != undefined) {
                        totalCount += doc.data().postCount;
                    }
                });
                return totalCount;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    },
    updateAuth(email, auth) {
        console.log(email + " " + auth);
        var userRef = firestore.collection(USERS).doc(email);

        return userRef.update({
                auth: auth
            }).then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    },
    addViews() {
        let d = new Date();
        d = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        console.log(d);
        const usersCollection = firestore.collection(VIEWS);
        return usersCollection.doc(d)
            .get()
            .then(function(doc) {
                var views = 0;
                if (doc.exists) {
                    console.log("Document data:1", doc.data());
                    views = doc.data().views + 1;
                    usersCollection.doc(d).set({
                        views
                    });

                } else {
                    console.log("No such document!");
                    usersCollection.doc(d).set({
                        views
                    });
                }
            }).catch(e => {
                console.log("Firebase Error")
            });
    },
    getViews() {
        let d = new Date();
        d = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        const usersCollection = firestore.collection(VIEWS);
        return usersCollection.doc(d)
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:2", doc.data());
                    return doc.data().views;

                } else {
                    console.log("No such document!");
                }
            }).catch(e => {
                console.log("Firebase Error")
            });
    }
}