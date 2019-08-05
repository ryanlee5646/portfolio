<template>
<div>
  <v-dialog v-model="dialogShow" max-width="500px">
    <v-card style="z-index: 100;">
      <v-container fluid v-if="isLogin">
        <v-form v-model="valid">
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="login.email"
                :rules="EmailRules"
                label="이메일"
                class="dohyeon-font"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="login.password"
                :rules="PasswordRules"
                :counter="10"
                label="비밀번호"
                class="dohyeon-font"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout justify-center ma-2>
          <v-flex xs12 sm4>
            <v-btn @click="signIn()" block flat class="dohyeon-font subheading">로그인</v-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn
              color
              @click="isLoginStage(false)"
              class="dohyeon-font subheading"
              block
              flat
            >회원가입</v-btn>
          </v-flex>
        </v-layout>
        <v-layout justify-center ma-2>
          <v-flex xs12 sm8>
            <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;">
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 로그인
            </v-btn>
            <v-btn round color="#4662b0" dark v-on:click="loginWithFacebook" style="width:100%;">
              <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 로그인
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fluid v-if="!isLogin">
        <v-form v-model="valid">
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="signup.email"
                :rules="EmailRules"
                label="이메일"
                class="dohyeon-font"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="signup.name"
                :rules="NameRules"
                label="이름"
                class="dohyeon-font"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="signup.password"
                :rules="PasswordRules"
                :counter="20"
                label="패스워드"
                class="dohyeon-font"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="signup.passwordConfirmed"
                :rules="passwordConfirmedRules"
                label="패스워드 확인"
                class="dohyeon-font"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="signup.gitlabID"
                :rules="EmailRules"
                label="Gitlab ID"
                class="dohyeon-font"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="signup.gitlabToken"
                :rules="PasswordRules"
                label="Gitlab Token"
                class="dohyeon-font"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout justify-center ma-2>
          <v-flex xs12 sm4>
            <v-btn class="dohyeon-font subheading" @click="signUp()" block flat>회원가입</v-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn color @click="isLoginStage(true)" class="dohyeon-font subheading" block flat>뒤로</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
  <!-- Gitlab 정보 입력 요구 질문 modal -->
  <v-dialog v-model="gitlabQuestion" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        첫 로그인
      </v-card-title>
      <v-card-text>
        Gitlab 정보를 입력하시겠습니까?
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog()">
          네
        </v-btn>
        <v-btn text @click="addGitlabInfo()">
          아니오
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Gitlab 정보 입력 창 -->
  <v-dialog v-model="gitlabInfo" max-width="500px">
      <v-card style="z-index: 100;">
        <v-container fluid >
          <v-form>
            <v-layout justify-center ma-2>
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="gitlab.gitlabID"
                  :rules="EmailRules"
                  label="Gitlab ID"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2>
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="gitlab.gitlabToken"
                  :rules="PasswordRules"
                  :counter="10"
                  label="Gitlab Token"
                  class="dohyeon-font"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm4>
              <v-btn @click="addGitlabInfo()" block flat class="dohyeon-font subheading">등록</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  
  </div>



</template>

<script>
import firebase from "firebase/app";
import FirebaseService from "@/services/FirebaseService";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "LoginPage",
  data() {
    return {
      valid: false,
      isLogin: true,
      gitlabQuestion: false,
      gitlabInfo : false,

      login: {
        password: "",
        email: ""
      },
      signup: {
        name: "",
        email: "",
        password: "",
        passwordConfirmed: "",
        gitlabID: "",
        gitlabToken: ""
      },
      gitlab: {
        gitlabID: "",
        gitlabToken: ""
      },
      NameRules: [v => !!v || "이름이 필요합니다"],
      PasswordRules: [
        v => !!v || "비밀번호가 필요합니다",
        v =>
          (v.length >= 10 && v.length <= 20) ||
          "비밀번호는 최소 10글자 이상이 되어야 합니다"
      ],
      passwordConfirmedRules: [
        v => !!v || "비밀번호를 확인해주세요",
        v => v == this.signup.password || "비밀번호와 똑같이 입력해야 합니다"
      ],
      EmailRules: [
        v => !!v || "이메일을 입력해주세요",
        v => /.+@.+/.test(v) || "유효한 이메일을 입력해주세요"
      ],
      GithubRules: [
        v => !!v || "Github 이메일을 입력해주세요",
        v => /.+@.+/.test(v) || "유효한 이메일을 입력해주세요"
      ]
    };
  },
  methods: {
    // 구글로그인
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("accessToken", result.credential.accessToken);

      // database 에 추가되어있지 않다면 유저 등록
      if (await FirebaseService.isRegistered(result.user.email)) {
        await FirebaseService.addUser(
          result.user.email,
          result.user.displayName,
          "visitor",
          result.user.photoURL,
          "",
          "",
          false
        );
      }
      FirebaseService.FirebaseLoginLog();
      
      // Check GitlabInfo
      const data = await FirebaseService.getUserInfo();
      if(data !== null){
        if ((data.gitlabID === "" || data.gitlabToken === "") && data.gitlabAllow === false){ 
          this.gitlabQuestion = true;
        }
      }

      const user = await FirebaseService.getUserInfo();
        if(user !== null){
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
      }

      this.$store.commit("loginDialog", false);
      this.$router.push("/");
      // localStorage.setItem("portfolios", this.$store.state.portfolios);
      
      FirebaseService.gettingToken();
    
    },
    // 페이스북 로그인
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("accessToken", result.credential.accessToken);

      // database 에 추가되어있지 않다면 유저 등록
      if (await FirebaseService.isRegistered(result.user.email)) {
        await FirebaseService.addUser(
          result.user.email,
          result.user.displayName,
          "visitor",
          result.user.photoURL,
          "",
          "",
          false
        );
      }
      
      FirebaseService.FirebaseLoginLog();
      
      // Check GitlabInfo
      const data = await FirebaseService.getUserInfo();
      
      if(data !== null){
        if ((data.gitlabID === "" || data.gitlabToken === "") && data.gitlabAllow === false){ 
          this.gitlabQuestion = true;
        }
      }
      this.$store.commit("loginDialog", false);
      this.$router.push("/");

      FirebaseService.gettingToken();
    },
    
    async addGitlabInfo(){
      try {
        await FirebaseService.addGitlabInfo(this.gitlab);

        this.gitlabQuestion = false
        this.gitlabInfo = false
        this.gitlab.gitlabID = ""
        this.gitlab.gitlabToken = ""

        const user = await FirebaseService.getUserInfo();
          if(user !== null){
            this.$store.state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
          }
      } catch (error) {
        console.log(`[error] addGitlabInfo func() : ${error}`)
      }
    },
    closeDialog() {
      this.gitlabQuestion = false
      this.gitlabInfo = true
    },
    isLoginStage(flag) {
      this.isLogin = flag;
    },
    async signUp() {
      alert("[signUp]");
      // 이메일 검증
      const result = await FirebaseService.signUp(this.signup);

      this.$store.commit("loginDialog", false);
      this.$router.push("/");
    },
    // 일반로그인
    async signIn() {
      const result = await FirebaseService.signIn(this.login);

      if(result !== undefined){
        const user = await FirebaseService.getUserInfo();
        
        if(user !== null){
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        }

        this.isLoginStage(true);
        this.$store.commit("loginDialog", false);
        this.$router.push("/");
      }
      FirebaseService.gettingToken();
    }
  },
  computed: {
    dialogShow: {
      set(value) {
        this.$store.commit("loginDialog", value);
      },
      get() {
        return this.$store.state.loginDialogShow;
      }
    }
  },
  mounted() {
    console.log(this.$store.state);
  }
};
</script>
