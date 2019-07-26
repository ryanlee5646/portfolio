<template>
  <v-dialog v-model="dialogShow" max-width="500px">
    <v-card>
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
          <v-flex
            xs12
            sm4
          >
            <v-btn @click="signIn()" block flat class="dohyeon-font subheading">로그인</v-btn>
          </v-flex>
          <v-flex
            xs12
            sm4
          >
          <v-btn color="" @click="isLoginStage(false)" class="dohyeon-font subheading" block flat>회원가입</v-btn>
        </v-flex>
        </v-layout>
        <v-layout justify-center ma-2>
          <v-flex
            xs12
            sm8
          >
            <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;"><v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인</v-btn>
            <v-btn round color="#4662b0" dark v-on:click="loginWithFacebook" style="width:100%;"><v-icon size="25" class="mr-2">fa-facebook</v-icon> Facebook 로그인</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fluid v-if="!isLogin">
        <v-form v-model="valid">
          <v-layout justify-center ma-2>
            <v-flex
              xs12
              sm8
            >
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
            <v-flex
              xs12
              sm8
            >
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
          <!-- <v-layout justify-center ma-2>
            <v-flex
              xs12
              sm8
            >
              <v-text-field
                v-model="signup.github"
                :rules="GithubRules"
                label="Github 계정"
                class="dohyeon-font"
                required
              ></v-text-field>
            </v-flex>
          </v-layout> -->
        </v-form>
        <v-layout justify-center ma-2>
          <v-flex
            xs12
            sm4
          >
            <v-btn class="dohyeon-font subheading" @click="signUp()" block flat>회원가입</v-btn>
          </v-flex>
          <v-flex
            xs12
            sm4
          >
          <v-btn color="" @click="isLoginStage(true)" class="dohyeon-font subheading" block flat>뒤로</v-btn>
        </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase/app';
import FirebaseService from '@/services/FirebaseService';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default {
  name: 'LoginPage',
  data() {
    return {
      valid: false,
      isLogin: true,
      login: {
        password: '',
        email: '',
      },
      signup: {
        name: '',
        email: '',
        password: '',
        passwordConfirmed: '',
        github: '',
      },
      NameRules: [
        v => !!v || '이름이 필요합니다',
      ],
      PasswordRules: [
        v => !!v || '비밀번호가 필요합니다',
        v => v.length >= 10 && v.length <= 20 || '비밀번호는 최소 10글자 이상이 되어야 합니다',
      ],
      passwordConfirmedRules: [
        v => !!v || '비밀번호를 확인해주세요',
        v => v == this.signup.password || '비밀번호와 똑같이 입력해야 합니다',
      ],
      EmailRules: [
        v => !!v || '이메일을 입력해주세요',
        v => /.+@.+/.test(v) || '유효한 이메일을 입력해주세요',
      ],
      GithubRules: [
        v => !!v || 'Github 이메일을 입력해주세요',
        v => /.+@.+/.test(v) || '유효한 이메일을 입력해주세요',
      ],
    };
  },
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;
      console.log(this.$store.state.user.email);

      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('accessToken', result.credential.accessToken);
      // database 에 추가되어있지 않다면 유저 등록
      if(!FirebaseService.isRegistered(result.user.email)){
        FirebaseService.addUser(result.user.email, result.user.displayName, "visitor", result.user.photoURL)
      }

      FirebaseService.FirebaseLoginLog();

      this.$store.commit('loginDialog', false);
      this.$router.push('/');
      localStorage.setItem('portfolios', this.$store.state.portfolios);
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;

      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('accessToken', result.credential.accessToken);


      // database 에 추가되어있지 않다면 유저 등록
      if (!FirebaseService.isRegistered(result.user.email)) {
        FirebaseService.addUser(result.user.email, result.user.displayName);
      }

      FirebaseService.FirebaseLoginLog();

      this.$store.commit('loginDialog', false);
      this.$router.push('/');
    },
    isLoginStage(flag) {
      this.isLogin = flag;
    },
    async signUp() {
      alert('[signUp]');
      // 이메일 검증
      const result = await FirebaseService.signUp(this.signup);

      // this.$store.commit('loginDialog', false);
      this.$router.push('/');
    },
    async signIn() {
      const result = await FirebaseService.signIn(this.login);

      const user = firebase.auth().currentUser;
      // PortfolioList.getPortfolios()
      // this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = user;

      localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem("accessToken",result.credential.accessToken)

      this.isLoginStage(true);
      this.$store.commit('loginDialog', false);
      this.$router.push('/');
    },


  },
  computed: {
    dialogShow: {
      set(value) {
        this.$store.commit('loginDialog', value);
      },
      get() {
        return this.$store.state.loginDialogShow;
      },
    },
  },
  mounted() {
    console.log(this.$store.state);
  },
};
</script>
