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
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="login.password"
                :rules="PasswordRules"
                :counter="20"
                label="비밀번호"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout justify-center ma-2>
          <v-flex xs12 sm4>
            <v-btn @click="signIn()" block text  class="headline">로그인</v-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn
              color
              @click="isLoginStage(false)"
              class="headline"
              block
              text
            >회원가입</v-btn>
          </v-flex>
        </v-layout>
        <v-layout justify-center ma-2>
          <v-flex xs12 sm8>
            <v-btn rounded color="#df4a31" dark v-on:click="loginWithGoogle" class="headline" style="width:100%; margin-bottom:10px; ">
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 로그인
            </v-btn>
            <v-btn rounded color="#4662b0" dark v-on:click="loginWithFacebook" class="headline" style="width:100%;">
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
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout justify-center ma-2>
          <v-flex xs12 sm4>
            <v-btn class="headline" @click="signUp()" block text>회원가입</v-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn color @click="isLoginStage(true)" class="headline" block text>뒤로</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
  <!-- Gitlab 정보 입력 요구 질문 modal -->
  <v-dialog v-model="gitlabQuestion" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <v-icon>person</v-icon> 첫 로그인
      </v-card-title>
      <v-card-text style="font-size:20px; margin-top: 20px;">
        Gitlab 정보를 입력하시겠습니까?
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-flex xs6>
          <v-btn class="headline" text style="margin-right:0px;" @click="closeDialog()">
          네
        </v-btn>
         </v-flex>
        <v-flex xs6>
        <v-btn class="headline" text style="margin-right:0px;" @click="addGitlabInfo()">
          아니오
        </v-btn>
        </v-flex>
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
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm4>
              <v-btn @click="addGitlabInfo()" block text class="headline">등록</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Skills 정보 입력창 -->
    <v-dialog v-model="skillsInfo" max-width="500px">
      <v-card style="z-index: 100;">
        <v-container fluid >
          <v-form>
            <v-layout justify-center ma-2> <!-- 1. HTML -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.development.HTML"
                  :rules="SkillsRules"
                  label="HTML5"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 2. Javascript -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.development.JavaScript"
                  :rules="SkillsRules"
                  label="Javascript"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 3. Vue -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.development.VUE"
                  :rules="SkillsRules"
                  label="Vue"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 4. CSS -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.development.CSS"
                  :rules="SkillsRules"
                  label="CSS"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2>  <!-- 5. c++ -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.development.Cpp"
                  :rules="SkillsRules"
                  label="C++"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 6. photoshop -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.design.PHOTOSHOP"
                  :rules="SkillsRules"
                  label="Photoshop"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 7. illustrator -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.design.ILLUSTRATOR"
                  :rules="SkillsRules"
                  label="Illustrator"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 8. userExperience -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.design.UX"
                  :rules="SkillsRules"
                  label="UX/UI"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 9. git -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.productivity.GIT"
                  :rules="SkillsRules"
                  label="Git"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center ma-2> <!-- 10. msoffice -->
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="skills.productivity.MSoffice"
                  :rules="SkillsRules"
                  label="MS Office"
                  class="dohyeon-font"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout justify-center ma-2>
            <v-flex xs12 sm4>
              <v-btn @click="addSkillsInfo()" block flat class="dohyeon-font subheading">등록</v-btn>
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
      skillsInfo : false,
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
      skills: {
        development : {
          HTML : "",
          JavaScript : "",
          VUE : "",
          CSS : "",
          Cpp : ""
        },
        design : {
          PHOTOSHOP : "",
          ILLUSTRATOR : "",
          UX : ""
        },
        productivity : {
          GIT : "",
          MSoffice : ""
        }
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
      ],
      SkillsRules: [
        v => !!v || "스킬포인트를 제대로 입력해주세요",
        v => (v > 0 && v <= 100) || "스킬포인트는 0~100점을 입력해주세요"
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
      // Check SkillsInfo
      if(data !== null){
        if ((data.auth !== "visitor" ) && data.skills === undefined){
          this.skillsInfo = true;
        }
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

      // Check SkillsInfo
      if(data !== null){
        if ((data.auth !== "visitor" ) && data.skills === undefined){
          this.skillsInfo = true;
        }
      }
      
      const user = await FirebaseService.getUserInfo();
        if(user !== null){
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
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
    async addSkillsInfo(){
      try {
        await FirebaseService.addSkillsInfo(this.skills);

        this.skillsInfo = false

        const user = await FirebaseService.getUserInfo();
        if(user !== null){
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.log(`[error] addSkillsInfo func() : ${error}`)
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
      // 이메일 검증
      const result = await FirebaseService.signUp(this.signup);

      this.signup = {
        name: "",
        email: "",
        password: "",
        passwordConfirmed: "",
        gitlabID: "",
        gitlabToken: ""
      };

      this.isLoginStage(true);
      this.$store.commit('setError', { type: 'success', code: '회원가입 성공', message: '회원가입에 성공했습니다. ' });
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
      // Check SkillsInfo
      if(user !== null){
        if ((user.auth !== "visitor" ) && user.skills === undefined){
          this.skillsInfo = true;
        }
      }
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
