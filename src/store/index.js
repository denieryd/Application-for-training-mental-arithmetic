import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nameControlButton: 'Меню',
    MainSettings: {
      lvlGame: 'Школьник-пятиклассник'
    },
    startingGame: false,
    typeGameSettings: {
      'Школьник-пятиклассник': {
        rangeNumber: [10, 50],
        rangeNumber1: [1, 20]
      },
      'Гуманитарий': {
        rangeNumber: [10, 100],
        rangeNumber1: [1, 30]
      },
      'Любитель цифр': {
        rangeNumber: [50, 500],
        rangeNumber1: [1, 80]
      },
      'Учишься на физ-мате': {
        rangeNumber: [50, 1500],
        rangeNumber1: [1, 200]
      },
      'Ходячий калькулятор': {
        rangeNumber: [150, 5600],
        rangeNumber1: [1, 600]
      }
    }
  },
  mutations: {
    setLvlGame(state, value) {
      state.MainSettings.lvlGame = value
    },
    stateStartingGame(state, value) {
      state.startingGame = value;
    }
  }
})
