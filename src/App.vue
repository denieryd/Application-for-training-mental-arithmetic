<template>
  <div id="app">
    <header class="main-header">
      <div class="header-content">
        <router-link :to="{name: 'MainMenu'}" tag="button" class="btn color-blue btn-lg" id="backButton">{{$store.state.nameControlButton}}</router-link>
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
      nameControlButton: ''
    }
  },
  created() {
    this.nameControlButton = this.$store.state.nameControlButton;

  },
  watch: {
    '$route': function () {
      if (this.$router.currentRoute.name === 'StartGame') {
        this.$store.state.nameControlButton = 'Вернуться в главное меню'
     } else if (this.$router.currentRoute.name === 'LvlGame' ) {
        this.$store.state.nameControlButton = 'Вернуться в главное меню'
      } else {
        this.$store.state.nameControlButton = 'Меню'
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

  .main-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    min-height: 75px;
    padding: 0 10px;

    background: #001f3f;
  }

  .header-content {
    position: relative;
    height: inherit;
    width: inherit;
  }

  .btn-lg {
    min-width: 200px;
    color: white;
  }

  .color-blue {
    background: #0074D9;
  }
</style>
