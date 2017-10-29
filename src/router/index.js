import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import StartGame from '@/components/StartGame'
import LvlGame from '@/components/MenuSett/LvlGame'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Menu',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/StartGame',
      name: 'StartGame',
      component: StartGame
    },
    {
      path: '/LvlGame',
      name: 'LvlGame',
      component: LvlGame
    },
    {
      path: '*',
      redirect: { name: 'MainMenu' }
    },
    {
      path: '/',
      redirect: { name: 'MainMenu' }
    }
  ]
})
