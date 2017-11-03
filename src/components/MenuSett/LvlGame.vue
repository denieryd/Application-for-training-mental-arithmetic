<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 main-menu">
          <h2>{{titlePage}}</h2>
          <h3>Текущий уровень: <span class="color-lvl-game"> <ins>{{currentLvl}}</ins> </span></h3>
          <div v-for="lvl in typeLvl" class="menu-item">
            <button type="button" class="btn btn-info btn-lg btn-block" @click="updateCurrentLvl(lvl)">{{lvl}}</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
  export default {
    name: 'LvlGame',
    data () {
      return {
        titlePage: 'Выберите уровень сложности игры',
        currentLvl: 'Школьник-пятиклассник',
        typeLvl: ['Школьник-пятиклассник', 'Турнирный режим (сезон)', 'Соц-эконом', 'Учишься на физ-мате', 'Ходячий калькулятор']
      }
    },
    created() {
      this.currentLvl = this.$store.state.MainSettings.lvlGame;
      if (this.$router.currentRoute.name === 'Menu') {
        this.$store.state.nameControlButton = 'Меню'
      } else {
        this.$store.state.nameControlButton = 'Вернуться в меню'
      }
    },
    watch: {
      '$store.state.MainSettings.lvlGame' : function () {
        this.currentLvl = this.$store.state.MainSettings.lvlGame;
      }
    },
    methods: {
      updateCurrentLvl(lvl) {
        this.$store.commit('setLvlGame', lvl);
        this.currentLvl = this.$store.state.MainSettings.lvlGame;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container {
    width: 100vw;
    background: beige;
  }

  .main-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    min-height: 550px;
    padding: 50px 50px;

    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: 2px solid black;
  }

  .menu-item {
    min-width: 300px;
  }

  .btn-info {
    cursor: pointer;
  }

  .color-lvl-game {
    color: indianred;
  }

</style>

