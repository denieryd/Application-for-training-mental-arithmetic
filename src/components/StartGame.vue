<template>
  <main @keyup.13="sendAnswer">
    <div class="animation-banner">
      <i class="fa fa-bell" aria-hidden="false"></i>
      <span class="text-animation-banner">
          {{ textBanner }}
      </span>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2>Текущий уровень игры - <span class="text-lvl-game">{{ currentLvlGame }}</span></h2>
          <h2>Настройте тренажер под себя</h2>
          <section class="game-settings">
            <div class="tourn-mode">
              <label class="custom-control custom-radio">
                <input id="radioStacked4" name="radio-stacked" value="true" type="radio" class="custom-control-input"
                       @change="enableTournMode('tourn')"
                       :disabled="$store.state.userData.loginSuccess ===  true ? false : true">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">
                  Турнирный режим (время: 1 минута)
                </span>
              </label>
              <span class="tourn-mode-details">Данный режим доступен только вошедшим пользователям</span>
            </div>
            <div class="custom-controls-stacked">
              <label class="custom-control custom-radio">
                <input id="radioStacked3" name="radio-stacked" type="radio" class="custom-control-input"
                       @change="enableTournMode('default')" checked>
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Играть на время (можно установить любое время)</span>
              </label>
              <label class="custom-control custom-checkbox">
                <input v-model="complicatedMode" type="checkbox" class="custom-control-input" id="complicatedMode">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Включить усложненный режим (добавить: *, / )</span>
              </label>
              <label>Выберите количество секунд игры
                <input class="range-time-game" type="number" value="20" min="5" max="240" step="5"
                       :disabled="$store.state.tournMode === true ? true : false">
              </label>
            </div>
          </section>
          <div class="control-btn-field">
            <button v-if="testingComplete" type="button" id="btn-start" class="btn btn-info btn-block"
                    @click="startTesting">Start
            </button>
            <button v-else type="button" id="btn-end" class="btn btn-info btn-block" @click="finishGame">Прервать
            </button>
          </div>
          <div class="alert alert-primary" role="alert">
            Совет: Используйте клавиши клавиатуры,ввод значений осуществляется быстрей.
            Как только вы начнете играть - ваш фокус будет на вводимом поле,просто нажимайте цифры на клавиаутуре.
          </div>
          <hr>
          <div class="output-field">
            <div class="example-field">
              <time class="">Осталось времени: <span id="outputTime" v-if="!testingComplete"></span></time>
              <h1 class="display-4">- Пример -</h1>
            </div>
            <div v-if="testingComplete">
              <h4>Результат игры</h4>
              <h4>Правильных ответов: <span class="count-correct-answer">{{ countCorrectAnswer }}</span></h4>
              <table class="table table-sm">
                <thead>
                <tr>
                  <th scope="col">Пример:</th>
                  <th scope="col">Ваш ответ:</th>
                  <th scope="col">Верный ответ:</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="result in listResultTest">
                  <td :class="result.userAnswer === result.Correct ? 'correct-answer' : 'wrong-answer' ">
                    {{ result.Example }}
                  </td>
                  <td :class="result.userAnswer === result.Correct ? 'correct-answer' : 'wrong-answer' ">
                    {{ result.userAnswer }}
                  </td>
                  <td :class="result.userAnswer === result.Correct ? 'correct-answer' : 'wrong-answer' ">
                    {{ result.Correct }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-12 game-field">
          <input v-model="dataCurrentTesting.userAnswer" class="field-answer" type="text"
                 placeholder="Здесь будет отображаться ваш вводимый ответ" @input="processedAnswer">
          <div class="number-field">
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="1">1
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="2">2
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="3">3
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="4">4
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="5">5
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="6">6
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="7">7
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="8">8
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="9">9
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="0">0
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value="-">-
            </button>
            <button type="button" class="btn btn-outline-info" @click="addNumber($event.target.value)" value=".">.
            </button>
            <button type="button" class="btn btn-large btn-danger" @click="sendAnswer">Отправить результат</button>
            <button type="button" class="btn btn-large btn-danger" @click="removeAnswer">Очистить</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import * as firebase from 'firebase'

export default {
  name: 'StartGame',
  data() {
    return {
      textBanner: 'Вы завершили испытание',
      old_game_mode: '',

      testingComplete: true,
      listResultTest: [],
      countCorrectAnswer: 0,
      currentLvlGame: '',
      timeCycle: '',
      timeCycle2: '',
      complicatedMode: false,

      tournMode: false,

      mathOperation: ['+', '-'],
      objectGameSettings: {},
      dataCurrentTesting: {
        currentExample: '',
        correctAnswer: '',
        userAnswer: ''
      }
    }
  },
  created() {
    this.currentLvlGame = this.$store.state.MainSettings.lvlGame;
    if (this.$router.currentRoute.name === 'Menu') {
      this.$store.state.nameControlButton = 'Меню'
    } else {
      this.$store.state.nameControlButton = 'Вернуться в меню'
    }
    window.addEventListener('blur', this.lossFocusDuringGame)
  },
  watch: {
    '$store.state.MainSettings.lvlGame': function () {
      this.currentLvlGame = this.$store.state.MainSettings.lvlGame;
    }
  },
  methods: {
    generateExample(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    getNumber(range1, range2) {
      let number1 = this.generateExample(range1, range2);
      let number2 = this.generateExample(range1, range2);
      return [number1, number2]
    },
    processedAnswer() {
      this.dataCurrentTesting.userAnswer = this.dataCurrentTesting.userAnswer.replace(/[^-.0-9]/ig, '');
      if (parseInt(this.dataCurrentTesting.userAnswer, 10) === this.dataCurrentTesting.correctAnswer) this.sendAnswer();
    },
    enableTournMode(value) {
      if (value === 'default') {
        document.querySelector('#complicatedMode').disabled = false;
        this.tournMode = false;
        this.$store.commit('tournMode', false);
        this.$store.commit('setLvlGame', this.old_game_mode);
      } else if (value === 'tourn') {
        document.querySelector('#complicatedMode').disabled = true;
        this.tournMode = true;
        this.complicatedMode = true;
        this.$store.commit('tournMode', true);
        this.old_game_mode = this.currentLvlGame;
        this.$store.commit('setLvlGame', 'Турнирный режим (сезон)');
      }
    },
    startTesting() {
      this.listResultTest = [];
      this.countCorrectAnswer = 0;
      this.objectGameSettings = this.$store.state.typeGameSettings[this.currentLvlGame];
      this.testingComplete = false;
      this.$store.commit('stateStartingGame', true);

      let timeForCurrentTesting = parseInt(document.querySelector('.range-time-game').value, 10);
      let totalTestingTime = parseInt(document.querySelector('.range-time-game').value, 10);

      if (this.tournMode) {
        timeForCurrentTesting = 60;
        totalTestingTime = 60;
        this.textBanner = 'Ваш результат занесен в "Аллею Славы"'
      }

      document.querySelector('.field-answer').focus();
      document.querySelector('.range-time-game').disabled = true;
      document.querySelector('#complicatedMode').disabled = true;
      this.updateCurrentExample();

      setTimeout(() => {
        document.querySelector('#outputTime').innerText = timeForCurrentTesting--;
      }, 0);
      this.timeCycle = setInterval(() => {
        if (document.querySelector('#outputTime')) document.querySelector('#outputTime').innerText = timeForCurrentTesting--;
      }, 1000);

      this.timeCycle2 = setTimeout(this.finishGame, totalTestingTime * 1000);
    },
    updateCurrentExample() {
      let indexMathOperation = this.generateExample(0, 1);
      let mathOperation = this.mathOperation[indexMathOperation];

      if (this.complicatedMode) {
        this.mathOperation = ['+', '-', '*', '/'];

        let indexMathOperation = this.generateExample(0, 3);
        let mathOperation = this.mathOperation[indexMathOperation];

        if (mathOperation === '+') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 + number2;
          this.dataCurrentTesting.currentExample = `${number1} + ${number2}`
        } else if (mathOperation === '-') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 - number2;
          this.dataCurrentTesting.currentExample = `${number1} - ${number2}`
        } else if (mathOperation === '*') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber1[0], this.objectGameSettings.rangeNumber1[1]);
          this.dataCurrentTesting.correctAnswer = number1 * number2;
          this.dataCurrentTesting.currentExample = `${number1} * ${number2}`
        } else if (mathOperation === '/') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber1[0], this.objectGameSettings.rangeNumber1[1]);

          while ((number1 / number2).toString().length > 2) {
            [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          }

          this.dataCurrentTesting.correctAnswer = number1 / number2;
          this.dataCurrentTesting.currentExample = `${number1} / ${number2}`
        }
      } else {
        if (mathOperation === '+') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 + number2;
          this.dataCurrentTesting.currentExample = `${number1} + ${number2}`
        } else if (mathOperation === '-') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 - number2;
          this.dataCurrentTesting.currentExample = `${number1} - ${number2}`
        }
      }
      if (document.querySelector('.display-4')) document.querySelector('.display-4').innerText = this.dataCurrentTesting.currentExample;
    },
    finishGame() {
      clearInterval(this.timeCycle);
      clearTimeout(this.timeCycle2);
      this.testingComplete = true;
      this.$store.commit('stateStartingGame', false);
      if (document.querySelector('#complicatedMode')) document.querySelector('#complicatedMode').disabled = false;
      if (document.querySelector('.range-time-game')) document.querySelector('.range-time-game').disabled = false;
      this.updateUsedFields();
      this.animationBannerEndGame();

      if (this.$store.state.userData.uidUser && this.tournMode) {
        firebase.database().ref().child('TotalUsers/' + this.$store.state.userData.uidUser)
            .update({resultTesting: this.countCorrectAnswer});
      }
    },
    updateUsedFields() {
      if (document.querySelector('#outputTime')) document.querySelector('#outputTime').innerText = '';
      if (document.querySelector('.display-4')) document.querySelector('.display-4').innerText = '- Пример -';
      this.dataCurrentTesting.userAnswer = '';
    },
    sendAnswer() {
      if (this.dataCurrentTesting.userAnswer.length === 0) return;
      if (!this.testingComplete) {
        if (parseInt(this.dataCurrentTesting.userAnswer, 10) === this.dataCurrentTesting.correctAnswer) this.countCorrectAnswer++;
        this.listResultTest.push({
          'Example': this.dataCurrentTesting.currentExample,
          'Correct': this.dataCurrentTesting.correctAnswer,
          'userAnswer': parseInt(this.dataCurrentTesting.userAnswer, 10)
        });
        this.updateCurrentExample();
      }
      this.dataCurrentTesting.userAnswer = '';
    },
    addNumber(value) {
      this.dataCurrentTesting.userAnswer += value;
      this.processedAnswer();
    },
    removeAnswer() {
      this.dataCurrentTesting.userAnswer = '';
    },
    lossFocusDuringGame() {
      if (!this.testingComplete) this.updateCurrentExample();
    },
    animationBannerEndGame() {
      setTimeout(() => {
        document.querySelector('.animation-banner').classList.add('animation-banner-start')
      }, 500);

      setTimeout(() => {
        document.querySelector('.animation-banner').classList.add('animation-banner-end')
      }, 3000);

      setTimeout(() => {
        document.querySelector('.animation-banner').classList.remove('animation-banner-start', 'animation-banner-end')
      }, 7000);
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.btn {
  cursor: pointer;
}

.count-correct-answer {
  color: green;
}

.correct-answer {
  border: 2px solid green;
}

.wrong-answer {
  border: 2px solid crimson;
}

main {
  position: relative;
}

.animation-banner {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4%;

  opacity: 0;
  color: black;
  font-size: 23px;
  z-index: 1;
  background: rgba(139, 197, 65, 1);
}

.animation-banner-start {
  transition: opacity 0.4s, transform;
  opacity: 1;
}

.animation-banner-end {
  transition: opacity 2.5s;
  opacity: 0;
}

.text-animation-banner {
  margin-left: 15px;
}

.row {
  display: grid;
  grid-template-columns: 15fr;
  grid-template-rows: 2fr 1fr;
  grid-gap: 30px;

  min-height: 550px;

  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 2px solid black;

  background: beige;
}

.range-time-game {
  min-width: 100px;
  padding-left: 7px;
}

.control-btn-field {
  display: flex;
  justify-content: center;

  width: 30%;
  margin-bottom: 10px;
  text-align: center;
}

.output-field {
  display: grid;
  grid-template-columns: 2fr 3fr;

  text-align: center;
}

.example-field {
  margin-right: 5px;
  border-right: 1px solid black;
}

.game-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;

  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 2px solid black;
}

.number-field {
  display: grid;
  grid-template-columns: 15fr 15fr 15fr;
  grid-template-rows: 35px 35px 35px;
  grid-gap: 5px;

  width: 65%;
  padding: 10px;

  border: 2px solid teal;
  border-radius: 5px;
}

.field-answer {
  width: 65%;
  margin-bottom: 20px;
  min-height: 40px;
  padding: 0 10px;

  border: 1px solid #cccccc;
  border-radius: 3px;
}

.field-answer:focus {
  -webkit-box-shadow: 0px 0px 5px #007eff;
      moz-box-shadow: 0px 0px 5px #007eff;
      box-shadow: 0px 0px 5px #007eff;
}

.text-lvl-game {
  color: indianred;
}

.game-settings {
  margin-bottom: 10px;
}


.tourn-mode-details {
  display: block;
  margin-top: -5px;
  margin-bottom: 10px;
}
</style>
