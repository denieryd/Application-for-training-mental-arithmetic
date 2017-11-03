import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import StartGame from '@/components/StartGame'
import LvlGame from '@/components/MenuSett/LvlGame'
import Auth from '@/components/Auth'
import RaitingUsers from '@/components/RaitingUsers'
import DeveloperNote from '@/components/DeveloperNote'

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
      path: '/Raiting',
      name: 'RaitingUsers',
      component: RaitingUsers
    },
    {
      path: 'Note',
      name: 'DeveloperNote',
      component: DeveloperNote
    },
    {
      path: '/auth/:modePage',
      name: 'Auth',
      component: Auth
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
