<template>
  <div class="container">
    <div class="row center">
      <div class="main-authorization">

        <h2 class="main-authorization-title text-effect-shadow">
          {{ $store.state.modePage === 'login' ? 'Sign to Math train' : 'Join to Math train' }}</h2>

        <form class="main-authorization-form" @submit.prevent="authorization">
          <label for="email">Email address</label>
          <input type="email" class="margin-bot-md" id="email" v-model="userData.email" placeholder="Email" required
                 autofocus>
          <div v-if="$store.state.modePage === 'registration'">
            <label for="displayName">Username</label>
            <input type="text" class="margin-bot-md" id="displayName" v-model="userData.displayName"
                   placeholder="Username" required>
          </div>
          <label for="password">Password</label>
          <input type="password" class="margin-bot-md" id="password" v-model="userData.pass" placeholder="Password"
                 required>
          <div v-if="$store.state.modePage === 'login'">
            <label class="custom-control custom-checkbox">
              <input v-model="restoreDataLogin" type="checkbox" class="custom-control-input" checked>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Запомнить логин и пароль</span>
            </label>
          </div>

          <div class="alert alert-danger margin-bot-lg" role="alert" v-if="errorsAuth">
            {{ messageError }}
          </div>
          <input type="submit" class="input-submit margin-top-md"
                 :value="$store.state.modePage === 'login' ? 'Войти на сайт' : 'Зарегистрироваться'">
        </form>
        <div class="main-authorization-footer margin-bot-lg">
          <span>{{ $store.state.modePage === 'login' ? 'New to Math train?' : 'Registered on Math train?' }}</span>
          <a href="#" @click.prevent="getAnotherPage">{{
              $store.state.modePage === 'login' ? 'Create a account' : 'Sign in account.'
            }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as firebase from 'firebase';

export default {
  name: 'AuthPage',
  data: () => {
    return {
      modePage: '',
      userData: {
        email: '',
        pass: '',
        displayName: ''
      },
      restoreDataLogin: false,
      messageError: '',
      errorsAuth: false,
      showSpinner: false
    }
  },
  created() {
    this.setModePage();
    this.recallLoginData();
  },
  watch: {
    '$route': 'setModePage',
    '$store.state.modePage': function () {
      this.errorsAuth = false;
      this.messageError = '';
    }
  },
  methods: {
    setModePage() {
      this.modePage = this.$route.params.modePage;
      this.$store.commit('setModePage', this.$route.params.modePage);
    },
    getAnotherPage() {
      let path;
      if (this.modePage === 'login') {
        path = {name: 'Auth', params: {modePage: 'registration'}};
      } else {
        path = {name: 'Auth', params: {modePage: 'login'}};
      }
      this.$router.push(path);
    },
    authorization() {
      if (this.modePage === 'registration') {
        if (this.userData.email.length > 4 && this.userData.pass.length > 5) {
          firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.pass)
              .then((response) => {
                this.$router.push({name: 'Auth', params: {modePage: 'login'}});
                firebase.database().ref('TotalUsers/' + response.uid).set({
                  'email': response.email,
                  'displayName': this.userData.displayName,
                  'resultTesting': 0,
                });
              })
              .catch(() => {
                this.errorsAuth = true;
                this.messageError = 'Аккаунт с таким email уже существует';
              });
        } else {
          this.messageError = 'Проверьте веденные данные по следующим критерям: Пароль длиннее 5 символов, Email длиннее 4. Введенные пароли должны совпадать';
          this.errorsAuth = true;
        }
      } else if (this.modePage === 'login') {
        this.logIn();
      }
    },
    logIn() {
      console.log('login method acted')
      if (this.userData.email.length > 0 && this.userData.pass.length > 0) {
        firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.pass)
            .then((response) => {
              console.log(response, 'right way')
              let userDataObj = {
                headerEmail: response.email,
                uidUser: response.uid,
                loginSuccess: true,
                resultForRaiting: 0
              };
              this.$store.commit('setUserData', userDataObj);
              this.$router.push({name: 'StartGame'});
              if (this.restoreDataLogin) {
                this.rememberLoginData();
              } else {
                localStorage.clear();
              }
            })
            .catch((e) => {
              console.log(e)
              this.errorsAuth = true;
              this.messageError = `Неверный логин или пароль`
            });
      } else {
        this.messageError = `Заполните оба поля!`;
        this.errorsAuth = true;
      }
    },
    rememberLoginData() {
      localStorage.email = this.userData.email;
      localStorage.pass = this.userData.pass;
    },
    recallLoginData() {
      if (localStorage.email && localStorage.pass) {
        this.userData.email = localStorage.email;
        this.userData.pass = localStorage.pass;
        this.restoreDataLogin = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.text-effect-shadow {
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 0 3px 3px;
  background-color: #666666;

  -webkit-background-clip: text;
}

.margin-bot-sm {
  margin-bottom: 10px;
}

.margin-bot-md {
  margin-bottom: 20px;
}

.margin-bot-lg {
  margin-bottom: 30px;
}

.margin-top-md {
  margin-top: 20px;
}

.margin-right-sm {
  margin-right: 10px;
}

.center {
  position: relative;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-flow: row;
  justify-content: center;

  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
}

.main-authorization {
  width: 30%;
}

.main-authorization-form {
  position: relative;

  min-width: 290px;
  min-height: 270px;
  padding: 20px;
  margin: 15px 0;

  border: 1px solid #d8dee2;
  border-radius: 5px;
  background: #fafbfc;
}

.main-authorization-title {
  color: darksalmon;
  text-align: center;
}

.main-authorization-form .input-submit {
  min-height: 34px;
  line-height: 34px;

  border-radius: 7px;
  color: white;
  background: #28a745;
  cursor: pointer;
}

.main-authorization-form input {
  min-height: 34px;
  line-height: 34px;

  padding: 6px 8px;
  border: 1px solid #d1d5da;
  border-radius: 3px;
}

.main-authorization-form label {
  margin-bottom: 3px;
}

.main-authorization-form label, .main-authorization-form input {
  display: block;
  width: 100%;
}

.main-authorization-form .secondary-controls {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-start;

  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-box-align: center;
  -ms-flex-align: center;

  align-items: center;
}

.main-authorization-form .input-remember-pass, .main-authorization-form .label-remember-pass {
  display: inline-block;
  margin: 0;
}

.main-authorization-form .input-remember-pass {
  width: 19px;
  margin-right: 10px;
}

.main-authorization-footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-around;

  width: 100%;
  padding: 13px 15px;
  font-size: 14px;

  border: 1px solid #d8dee2;
  border-radius: 5px;
  background: #f9f9f9;
}

.input-group {
  padding-bottom: 5px;
  padding-top: 5px;
}

.text-area-input {
  max-height: 250px;
  padding: 5px 15px 5px 7px
}

.container {
  border: 2px solid black;
  border-radius: 5px;
  background: #2b3237;
}

</style>
