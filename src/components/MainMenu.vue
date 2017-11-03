<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 main-menu">
          <h1 class="title-page">{{titlePage}}</h1>
          <div class="menu-item">
            <router-link :to="{name: 'StartGame'}" tag="button" class="btn btn-danger btn-lg btn-block">Начать игру</router-link>
          </div>
          <div class="menu-item">
            <router-link :to="{name: 'LvlGame'}" tag="button" class="btn btn-danger btn-lg btn-block">Выбрать уровень сложности</router-link>
          </div>
          <div class="menu-item">
            <router-link :to="{name: 'RaitingUsers'}" tag="button" class="btn btn-danger btn-lg btn-block">Аллея Славы</router-link>
          </div>
          <div class="menu-item">
            <router-link :to="{name: 'DeveloperNote'}" tag="button" class="btn btn-danger btn-lg btn-block">Заметка создателя</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
export default {
  name: 'MainMenu',
  data () {
    return {
      titlePage: 'Главное меню тренажера'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  body {
    font-family: 'Open Sans', sans-serif;
  }

  .title-page {
    margin-top: -30px;
  }

  .main-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    min-height: 420px;
    padding: 50px 50px;

    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: 2px solid black;

    background: beige;
  }

  .menu-item {
    width: 380px;
  }

  .btn-danger {
    cursor: pointer;
  }
</style>
