<template>
  <div id="app">
    <header class="main-header">
      <div class="header-content">
        <router-link :to="{name: 'MainMenu'}" tag="button" class="btn color-blue btn-lg" id="backButton">{{$store.state.nameControlButton}}</router-link>
        <div class="authentication">
          <router-link :to="{name: 'Auth', params: {modePage: 'login'}}" tag="button" class="btn color-blue btn-lg">Вход</router-link>
          <router-link :to="{name: 'Auth', params: {modePage: 'registration'}}" tag="button" class="btn color-blue btn-lg">Регистрация</router-link>
        </div>
      </div>
    </header>

    <router-view>

    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  },
  watch: {
    '$route': function () {
      if (this.$router.currentRoute.name === 'MainMenu') {
        this.$store.state.nameControlButton = 'Меню'
      } else {
        this.$store.state.nameControlButton = 'Вернуться в меню'
      }
    },
    '$store.state.startingGame': function () {
      let btnBack = document.querySelector('#backButton');
      if (this.$store.state.startingGame) {
        btnBack.disabled = true;
      } else {
        btnBack.disabled = false;
      }
    }
  }
}
</script>

<style scoped>

  body {
    font-family: 'Open Sans', sans-serif;
  }

  .main-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    min-height: 75px;
    padding: 0 10px;

    background-color: #2b4547;
  }

  .header-content {
    position: relative;
    display: flex;
    justify-content: space-between;

    height: inherit;
    width: inherit;
  }

  .btn-lg {
    min-width: 200px;
    margin: 5px;

    cursor: pointer;
    color: white;
  }

  .color-blue {
    background: #0074D9;
  }
</style>


