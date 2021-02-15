webpackJsonp([1],{

/***/ "+5WV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "1+io":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__("Sazm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'StartGame',
  data() {
    return {
      textBanner: 'Вы завершили испытание',

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
    };
  },
  created() {
    this.currentLvlGame = this.$store.state.MainSettings.lvlGame;
    if (this.$router.currentRoute.name === 'Menu') {
      this.$store.state.nameControlButton = 'Меню';
    } else {
      this.$store.state.nameControlButton = 'Вернуться в меню';
    }
    window.addEventListener('blur', this.lossFocusDuringGame);
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
      return [number1, number2];
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
      } else if (value === 'tourn') {
        document.querySelector('#complicatedMode').disabled = true;
        this.tournMode = true;
        this.complicatedMode = true;
        this.$store.commit('tournMode', true);
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
        this.textBanner = 'Ваш результат занесен в "Аллею Славы"';
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
          this.dataCurrentTesting.currentExample = `${number1} + ${number2}`;
        } else if (mathOperation === '-') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 - number2;
          this.dataCurrentTesting.currentExample = `${number1} - ${number2}`;
        } else if (mathOperation === '*') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber1[0], this.objectGameSettings.rangeNumber1[1]);
          this.dataCurrentTesting.correctAnswer = number1 * number2;
          this.dataCurrentTesting.currentExample = `${number1} * ${number2}`;
        } else if (mathOperation === '/') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber1[0], this.objectGameSettings.rangeNumber1[1]);

          while ((number1 / number2).toString().length > 2) {
            [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          }

          this.dataCurrentTesting.correctAnswer = number1 / number2;
          this.dataCurrentTesting.currentExample = `${number1} / ${number2}`;
        }
      } else {
        if (mathOperation === '+') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 + number2;
          this.dataCurrentTesting.currentExample = `${number1} + ${number2}`;
        } else if (mathOperation === '-') {
          let [number1, number2] = this.getNumber(this.objectGameSettings.rangeNumber[0], this.objectGameSettings.rangeNumber[1]);
          this.dataCurrentTesting.correctAnswer = number1 - number2;
          this.dataCurrentTesting.currentExample = `${number1} - ${number2}`;
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
        __WEBPACK_IMPORTED_MODULE_0_firebase__["database"]().ref().child('TotalUsers/' + this.$store.state.userData.uidUser).update({ resultTesting: this.countCorrectAnswer });
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
        document.querySelector('.animation-banner').classList.add('animation-banner-start');
      }, 500);

      setTimeout(() => {
        document.querySelector('.animation-banner').classList.add('animation-banner-end');
      }, 3000);

      setTimeout(() => {
        document.querySelector('.animation-banner').classList.remove('animation-banner-start', 'animation-banner-end');
      }, 7000);
    }
  }
});

/***/ }),

/***/ "13/z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'RaitingUsers',
  data() {
    return {
      titlePage: 'Обо всём'
    };
  }
});

/***/ }),

/***/ "17oP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('table',{staticClass:"table table-hover"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.listResultUsers),function(user,index){return _c('tr',[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(index + 1))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(user.displayName))]),_vm._v(" "),_c('td',{staticClass:"correct-answer"},[_vm._v(" "+_vm._s(user.Rate))])])}))]),_vm._v(" "),(_vm.showSpinner)?_c('div',{staticClass:"spinner-wrapper"},[_c('img',{attrs:{"src":__webpack_require__("rH7F"),"alt":"spinner"}})]):_vm._e()])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("#")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Username")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Лучший результат по количеству верных ответов")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "1NPT":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "2oe7":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "5zwS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9p6f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__("Sazm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'RaitingUsers',
  data() {
    return {
      listResultUsers: [],
      showSpinner: true
    };
  },
  created() {
    this.getRaitingUsers();
    if (this.$router.currentRoute.name === 'Menu') {
      this.$store.state.nameControlButton = 'Меню';
    } else {
      this.$store.state.nameControlButton = 'Вернуться в меню';
    }
  },
  methods: {
    getRaitingUsers() {
      __WEBPACK_IMPORTED_MODULE_0_firebase__["database"]().ref('/TotalUsers').once('value').then(snapshot => {
        this.getResultUser(snapshot.val());
      });
    },
    getResultUser(objectResultUser) {
      let _this = this;
      for (let key in objectResultUser) {
        _this.listResultUsers.push({
          'displayName': objectResultUser[key].displayName,
          'Rate': objectResultUser[key].resultTesting
        });
      }
      for (let i = 0; i < this.listResultUsers.length; i++) {
        for (let k = 0; k < this.listResultUsers.length; k++) {
          if (this.listResultUsers[i].Rate > this.listResultUsers[k].Rate) {
            [this.listResultUsers[i], this.listResultUsers[k]] = [this.listResultUsers[k], this.listResultUsers[i]];
          }
        }
      }
      this.showSpinner = false;
    }
  }
});

/***/ }),

/***/ "AufH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{on:{"keyup":function($event){if(!('button' in $event)&&$event.keyCode!==13){ return null; }_vm.sendAnswer($event)}}},[_c('div',{staticClass:"animation-banner"},[_c('i',{staticClass:"fa fa-bell",attrs:{"aria-hidden":"false"}}),_vm._v(" "),_c('span',{staticClass:"text-animation-banner"},[_vm._v("\n        "+_vm._s(_vm.textBanner)+"\n    ")])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-12"},[_c('h2',[_vm._v("Текущий уровень игры - "),_c('span',{staticClass:"text-lvl-game"},[_vm._v(_vm._s(_vm.currentLvlGame))])]),_vm._v(" "),_c('h2',[_vm._v("Настройте тренажер под себя")]),_vm._v(" "),_c('section',{staticClass:"game-settings"},[_c('div',{staticClass:"tourn-mode"},[_c('label',{staticClass:"custom-control custom-radio"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"radioStacked4","name":"radio-stacked","value":"true","type":"radio","disabled":_vm.$store.state.userData.loginSuccess ===  true ? false : true},on:{"change":function($event){_vm.enableTournMode('tourn')}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description"},[_vm._v("\n                Турнирный режим (время: 1 минута)\n              ")])]),_vm._v(" "),_c('span',{staticClass:"tourn-mode-details"},[_vm._v("Данный режим доступен только вошедшим пользователям")])]),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('label',{staticClass:"custom-control custom-radio"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"radioStacked3","name":"radio-stacked","type":"radio","checked":""},on:{"change":function($event){_vm.enableTournMode('default')}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description"},[_vm._v("Играть на время (можно установить любое)")])]),_vm._v(" "),_c('label',{staticClass:"custom-control custom-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.complicatedMode),expression:"complicatedMode"}],staticClass:"custom-control-input",attrs:{"type":"checkbox","id":"complicatedMode"},domProps:{"checked":Array.isArray(_vm.complicatedMode)?_vm._i(_vm.complicatedMode,null)>-1:(_vm.complicatedMode)},on:{"change":function($event){var $$a=_vm.complicatedMode,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.complicatedMode=$$a.concat([$$v]))}else{$$i>-1&&(_vm.complicatedMode=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.complicatedMode=$$c}}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description"},[_vm._v("Включить усложненный режим (добавить: *, / )")])]),_vm._v(" "),_c('label',[_vm._v("Выберите количество секунд игры\n              "),_c('input',{staticClass:"range-time-game",attrs:{"type":"number","value":"20","min":"5","max":"240","step":"5","disabled":_vm.$store.state.tournMode === true ? true : false}})])])]),_vm._v(" "),_c('div',{staticClass:"control-btn-field"},[(_vm.testingComplete)?_c('button',{staticClass:"btn btn-info btn-block",attrs:{"type":"button","id":"btn-start"},on:{"click":_vm.startTesting}},[_vm._v("Start")]):_c('button',{staticClass:"btn btn-info btn-block",attrs:{"type":"button","id":"btn-end"},on:{"click":_vm.finishGame}},[_vm._v("Прервать")])]),_vm._v(" "),_c('div',{staticClass:"alert alert-primary",attrs:{"role":"alert"}},[_vm._v("\n          Совет: Используйте клавиши клавиатуры,ввод значений осуществляется быстрей.\n          Как только вы начнете играть - ваш фокус будет на вводимом поле,просто нажимайте цифры на клавиаутуре.\n        ")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('div',{staticClass:"output-field"},[_c('div',{staticClass:"example-field"},[_c('time',{},[_vm._v("Осталось времени: "),(!_vm.testingComplete)?_c('span',{attrs:{"id":"outputTime"}}):_vm._e()]),_vm._v(" "),_c('h1',{staticClass:"display-4"},[_vm._v("- Пример -")])]),_vm._v(" "),(_vm.testingComplete)?_c('div',[_c('h4',[_vm._v("Результат игры")]),_vm._v(" "),_c('h4',[_vm._v("Правильных ответов: "),_c('span',{staticClass:"count-correct-answer"},[_vm._v(_vm._s(_vm.countCorrectAnswer))])]),_vm._v(" "),_c('table',{staticClass:"table table-sm"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.listResultTest),function(result){return _c('tr',[_c('td',{class:result.userAnswer === result.Correct ? 'correct-answer' : 'wrong-answer'},[_vm._v(_vm._s(result.Example))]),_vm._v(" "),_c('td',{class:result.userAnswer === result.Correct ? 'correct-answer' : 'wrong-answer'},[_vm._v(_vm._s(result.userAnswer))]),_vm._v(" "),_c('td',{class:result.userAnswer === result.Correct ? 'correct-answer' : 'wrong-answer'},[_vm._v(_vm._s(result.Correct))])])}))])]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-lg-12 game-field"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dataCurrentTesting.userAnswer),expression:"dataCurrentTesting.userAnswer"}],staticClass:"field-answer",attrs:{"type":"text","placeholder":"Здесь будет отображаться ваш вводимый ответ"},domProps:{"value":(_vm.dataCurrentTesting.userAnswer)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.dataCurrentTesting, "userAnswer", $event.target.value)},_vm.processedAnswer]}}),_vm._v(" "),_c('div',{staticClass:"number-field"},[_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"1"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("1")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"2"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("2")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"3"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("3")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"4"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("4")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"5"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("5")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"6"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("6")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"7"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("7")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"8"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("8")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"9"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("9")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"0"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("0")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"-"},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v("-")]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-info",attrs:{"type":"button","value":"."},on:{"click":function($event){_vm.addNumber($event.target.value)}}},[_vm._v(".")]),_vm._v(" "),_c('button',{staticClass:"btn btn-large btn-danger",attrs:{"type":"button"},on:{"click":_vm.sendAnswer}},[_vm._v("Отправить результат")]),_vm._v(" "),_c('button',{staticClass:"btn btn-large btn-danger",attrs:{"type":"button"},on:{"click":_vm.removeAnswer}},[_vm._v("Очистить")])])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Пример:")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Ваш ответ:")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Верный ответ:")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "CG0T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LvlGame_vue__ = __webpack_require__("afLU");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_af88f66c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LvlGame_vue__ = __webpack_require__("iWEU");
function injectStyle (ssrContext) {
  __webpack_require__("riYP")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-af88f66c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LvlGame_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_af88f66c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LvlGame_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "Fjb5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('header',{staticClass:"main-header"},[_c('div',{staticClass:"header-content"},[_c('router-link',{staticClass:"btn color-blue btn-lg",attrs:{"to":{name: 'MainMenu'},"tag":"button","id":"backButton"}},[_vm._v(_vm._s(_vm.$store.state.nameControlButton))]),_vm._v(" "),_c('div',{staticClass:"authentication"},[_c('router-link',{staticClass:"btn color-blue btn-lg",attrs:{"to":{name: 'Auth', params: {modePage: 'login'}},"tag":"button"}},[_vm._v("Вход")]),_vm._v(" "),_c('router-link',{staticClass:"btn color-blue btn-lg",attrs:{"to":{name: 'Auth', params: {modePage: 'registration'}},"tag":"button"}},[_vm._v("Регистрация")])],1)],1)]),_vm._v(" "),_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Gvld":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "IcnI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("NYxO");



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  state: {
    modePage: '',
    nameControlButton: 'В меню',

    startingGame: false,
    tournMode: false,
    MainSettings: {
      lvlGame: 'Школьник-пятиклассник'
    },

    userData: {
      headerEmail: '',
      displayName: '',
      uidUser: false,
      loginSuccess: false,
      resultForRaiting: ''
    },

    typeGameSettings: {
      'Школьник-пятиклассник': {
        rangeNumber: [10, 50],
        rangeNumber1: [1, 20]
      },
      'Турнирный режим (сезон)': {
        rangeNumber: [10, 100],
        rangeNumber1: [1, 30]
      },
      'Соц-эконом': {
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
      state.MainSettings.lvlGame = value;
    },
    tournMode(state, value) {
      state.tournMode = value;
    },
    stateStartingGame(state, value) {
      state.startingGame = value;
    },
    setModePage(state, value) {
      state.modePage = value;
    },
    setUserData(state, obj) {
      state.userData = obj;
    }
  }
}));

/***/ }),

/***/ "J+R/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Auth_vue__ = __webpack_require__("ngLG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_51bcca1c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Auth_vue__ = __webpack_require__("udP6");
function injectStyle (ssrContext) {
  __webpack_require__("2oe7")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-51bcca1c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Auth_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_51bcca1c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Auth_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "JeYC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-12 main-menu"},[_c('h1',{staticClass:"title-page"},[_vm._v(_vm._s(_vm.titlePage))]),_vm._v(" "),_c('div',{staticClass:"menu-item"},[_c('router-link',{staticClass:"btn btn-danger btn-lg btn-block",attrs:{"to":{name: 'StartGame'},"tag":"button"}},[_vm._v("Начать игру")])],1),_vm._v(" "),_c('div',{staticClass:"menu-item"},[_c('router-link',{staticClass:"btn btn-danger btn-lg btn-block",attrs:{"to":{name: 'LvlGame'},"tag":"button"}},[_vm._v("Выбрать уровень сложности")])],1),_vm._v(" "),_c('div',{staticClass:"menu-item"},[_c('router-link',{staticClass:"btn btn-danger btn-lg btn-block",attrs:{"to":{name: 'RaitingUsers'},"tag":"button"}},[_vm._v("Аллея Славы")])],1),_vm._v(" "),_c('div',{staticClass:"menu-item"},[_c('router-link',{staticClass:"btn btn-danger btn-lg btn-block",attrs:{"to":{name: 'DeveloperNote'},"tag":"button"}},[_vm._v("Заметка создателя")])],1)])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d8848908_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("Fjb5");
function injectStyle (ssrContext) {
  __webpack_require__("1NPT")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d8848908"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d8848908_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__("YaEn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store___ = __webpack_require__("IcnI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__("Sazm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.






__WEBPACK_IMPORTED_MODULE_4_firebase__["initializeApp"]({
    apiKey: "AIzaSyCcI4kBCa8LTxpDiS8YeKp12uAcuk9sjZ8",
    authDomain: "mental-7912c.firebaseapp.com",
    databaseURL: "https://mental-7912c.firebaseio.com",
    projectId: "mental-7912c",
    storageBucket: "mental-7912c.appspot.com",
    messagingSenderId: "7528187351",
    appId: "1:7528187351:web:1985e9a0b402d829843792"
});

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#app',
    router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
    store: __WEBPACK_IMPORTED_MODULE_3__store___["a" /* default */],
    template: '<App/>',
    components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] }
});

/***/ }),

/***/ "Pv7L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('article',{staticClass:"col-lg-12 main-menu"},[_c('h1',{staticClass:"title-page"},[_vm._v(_vm._s(_vm.titlePage))]),_vm._v(" "),_vm._m(0)])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"about-page"},[_c('section',{staticClass:"about-game-section"},[_c('h4',{staticClass:"about-game-title"},[_vm._v(" Что это такое и зачем?")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("Это обычное приложение для тренировки ментальной арифметики,\n            "),_c('br'),_vm._v("\n            Которое я решил создать ради практики.\n          ")])]),_vm._v(" "),_c('section',{staticClass:"about-game-section"},[_c('h4',{staticClass:"about-game-title"},[_vm._v("#История:")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              Однажды один человек написал,мол не у всех хорошо с устным счетом.Отсюда и родилась идея:)\n            ")])]),_vm._v(" "),_c('section',{staticClass:"about-game-section"},[_c('h4',{staticClass:"about-game-title"},[_vm._v("#Функции:")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.1 - Тренировка устного счета.\n            ")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.2 - Увеличение скорости вычислений простых примеров.\n            ")])]),_vm._v(" "),_c('section',{staticClass:"about-game-section"},[_c('h4',{staticClass:"about-game-title"},[_vm._v("#Особенности:")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.1 - После каждый тренировки вы сразу же наблюдаете результат.\n            ")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.2 - Вы можете соревноваться с друзьями,играя турнирный режим.\n            ")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.3 - В игре присутствует 5 режимов,которые влияют на сложность примеров.\n            ")])]),_vm._v(" "),_c('section',{staticClass:"about-game-section"},[_c('h4',{staticClass:"about-game-title"},[_vm._v("#Рейтинг:")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.1 - Чтобы соревноваться с другими пользователями проделайте следующие инструкции:\n              "),_c('span',{staticClass:"about-game-subtext"},[_vm._v("@1.1.1 - Зарегистрируйте аккаунт.")]),_vm._v(" "),_c('span',{staticClass:"about-game-subtext"},[_vm._v("@1.1.2 - Войдите в аккаунт.")]),_vm._v(" "),_c('span',{staticClass:"about-game-subtext"},[_vm._v("@1.1.3 - Зайдите в \"Начать игру\".")]),_vm._v(" "),_c('span',{staticClass:"about-game-subtext"},[_vm._v("@1.1.3 - Поставьте турнирный режим,решайте примеры.")]),_vm._v(" "),_c('span',{staticClass:"about-game-subtext"},[_vm._v("@1.1.4 - После завершения испытания ваш результат будет занесен в рейтинг")])]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              #1.2 - Каждая новая игра в режиме \"Турнир\" заменяет ваш старый результат на новый.\n            ")])]),_vm._v(" "),_c('section',{staticClass:"about-game-section"},[_c('h4',{staticClass:"about-game-title"},[_vm._v("#Прочее:")]),_vm._v(" "),_c('span',{staticClass:"about-game-text"},[_vm._v("\n              Ваши пожелания и замечание я буду рад учесть:\n              "),_c('span',{staticClass:"about-game-subtext"},[_c('a',{attrs:{"href":"https://vk.com/heyhodeonis","target":"_blank"}},[_vm._v("@vk")])]),_vm._v(" "),_c('span',{staticClass:"about-game-subtext"},[_c('a',{attrs:{"href":"https://web.telegram.org/#/im?p=@Dakotaz","target":"_blank"}},[_vm._v("@telegram")])])])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "QqgZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RaitingUsers_vue__ = __webpack_require__("9p6f");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c67a954_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_RaitingUsers_vue__ = __webpack_require__("17oP");
function injectStyle (ssrContext) {
  __webpack_require__("ggW0")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4c67a954"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RaitingUsers_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c67a954_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_RaitingUsers_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "SVxk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'MainMenu',
  data() {
    return {
      titlePage: 'Главное меню тренажера'
    };
  }
});

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MainMenu__ = __webpack_require__("x7p7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_StartGame__ = __webpack_require__("z5Is");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_MenuSett_LvlGame__ = __webpack_require__("CG0T");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Auth__ = __webpack_require__("J+R/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_RaitingUsers__ = __webpack_require__("QqgZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_DeveloperNote__ = __webpack_require__("d5FK");









__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  routes: [{
    path: '/Menu',
    name: 'MainMenu',
    component: __WEBPACK_IMPORTED_MODULE_2__components_MainMenu__["a" /* default */]
  }, {
    path: '/StartGame',
    name: 'StartGame',
    component: __WEBPACK_IMPORTED_MODULE_3__components_StartGame__["a" /* default */]
  }, {
    path: '/LvlGame',
    name: 'LvlGame',
    component: __WEBPACK_IMPORTED_MODULE_4__components_MenuSett_LvlGame__["a" /* default */]
  }, {
    path: '/Raiting',
    name: 'RaitingUsers',
    component: __WEBPACK_IMPORTED_MODULE_6__components_RaitingUsers__["a" /* default */]
  }, {
    path: 'Note',
    name: 'DeveloperNote',
    component: __WEBPACK_IMPORTED_MODULE_7__components_DeveloperNote__["a" /* default */]
  }, {
    path: '/auth/:modePage',
    name: 'Auth',
    component: __WEBPACK_IMPORTED_MODULE_5__components_Auth__["a" /* default */]
  }, {
    path: '*',
    redirect: { name: 'MainMenu' }
  }, {
    path: '/',
    redirect: { name: 'MainMenu' }
  }]
}));

/***/ }),

/***/ "afLU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'LvlGame',
  data() {
    return {
      titlePage: 'Выберите уровень сложности игры',
      currentLvl: 'Школьник-пятиклассник',
      typeLvl: ['Школьник-пятиклассник', 'Турнирный режим (сезон)', 'Соц-эконом', 'Учишься на физ-мате', 'Ходячий калькулятор']
    };
  },
  created() {
    this.currentLvl = this.$store.state.MainSettings.lvlGame;
    if (this.$router.currentRoute.name === 'Menu') {
      this.$store.state.nameControlButton = 'Меню';
    } else {
      this.$store.state.nameControlButton = 'Вернуться в меню';
    }
  },
  watch: {
    '$store.state.MainSettings.lvlGame': function () {
      this.currentLvl = this.$store.state.MainSettings.lvlGame;
    }
  },
  methods: {
    updateCurrentLvl(lvl) {
      this.$store.commit('setLvlGame', lvl);
      this.currentLvl = this.$store.state.MainSettings.lvlGame;
    }
  }
});

/***/ }),

/***/ "d5FK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DeveloperNote_vue__ = __webpack_require__("13/z");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fc14f5d0_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DeveloperNote_vue__ = __webpack_require__("Pv7L");
function injectStyle (ssrContext) {
  __webpack_require__("+5WV")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DeveloperNote_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fc14f5d0_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DeveloperNote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "ggW0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "iWEU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-12 main-menu"},[_c('h2',[_vm._v(_vm._s(_vm.titlePage))]),_vm._v(" "),_c('h3',[_vm._v("Текущий уровень: "),_c('span',{staticClass:"color-lvl-game"},[_c('ins',[_vm._v(_vm._s(_vm.currentLvl))])])]),_vm._v(" "),_vm._l((_vm.typeLvl),function(lvl){return _c('div',{staticClass:"menu-item"},[_c('button',{staticClass:"btn btn-info btn-lg btn-block",attrs:{"type":"button"},on:{"click":function($event){_vm.updateCurrentLvl(lvl)}}},[_vm._v(_vm._s(lvl))])])})],2)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "ngLG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__("Sazm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
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
    };
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
        path = { name: 'Auth', params: { modePage: 'registration' } };
      } else {
        path = { name: 'Auth', params: { modePage: 'login' } };
      }
      this.$router.push(path);
    },
    authorization() {
      if (this.modePage === 'registration') {
        if (this.userData.email.length > 4 && this.userData.pass.length > 5) {
          __WEBPACK_IMPORTED_MODULE_0_firebase__["auth"]().createUserWithEmailAndPassword(this.userData.email, this.userData.pass).then(response => {
            this.$router.push({ name: 'Auth', params: { modePage: 'login' } });
            __WEBPACK_IMPORTED_MODULE_0_firebase__["database"]().ref('TotalUsers/' + response.uid).set({
              'email': response.email,
              'displayName': this.userData.displayName,
              'resultTesting': 0
            });
          }).catch(() => {
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
      if (this.userData.email.length > 0 && this.userData.pass.length > 0) {
        __WEBPACK_IMPORTED_MODULE_0_firebase__["auth"]().signInWithEmailAndPassword(this.userData.email, this.userData.pass).then(response => {
          console.log(response);
          let userDataObj = {
            headerEmail: response.email,
            uidUser: response.uid,
            loginSuccess: true,
            resultForRaiting: 0
          };
          this.$store.commit('setUserData', userDataObj);
          this.$router.push({ name: 'StartGame' });
          if (this.restoreDataLogin) {
            this.rememberLoginData();
          } else {
            localStorage.clear();
          }
        }).catch(e => {
          console.log(e);
          this.errorsAuth = true;
          this.messageError = `Неверный логин или пароль`;
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
});

/***/ }),

/***/ "rH7F":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/spinner.c838288.gif";

/***/ }),

/***/ "riYP":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "udP6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"row center"},[_c('div',{staticClass:"main-authorization"},[_c('h2',{staticClass:"main-authorization-title text-effect-shadow"},[_vm._v(_vm._s(_vm.$store.state.modePage === 'login' ? 'Sign to Marh' : 'Join to Marh'))]),_vm._v(" "),_c('form',{staticClass:"main-authorization-form",on:{"submit":function($event){$event.preventDefault();_vm.authorization($event)}}},[_c('label',{attrs:{"for":"email"}},[_vm._v("Email address")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userData.email),expression:"userData.email"}],staticClass:"margin-bot-md",attrs:{"type":"email","id":"email","placeholder":"Email","required":"","autofocus":""},domProps:{"value":(_vm.userData.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userData, "email", $event.target.value)}}}),_vm._v(" "),(_vm.$store.state.modePage === 'registration')?_c('div',[_c('label',{attrs:{"for":"displayName"}},[_vm._v("Username")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userData.displayName),expression:"userData.displayName"}],staticClass:"margin-bot-md",attrs:{"type":"text","id":"displayName","placeholder":"Username","required":""},domProps:{"value":(_vm.userData.displayName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userData, "displayName", $event.target.value)}}})]):_vm._e(),_vm._v(" "),_c('label',{attrs:{"for":"password"}},[_vm._v("Password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userData.pass),expression:"userData.pass"}],staticClass:"margin-bot-md",attrs:{"type":"password","id":"password","placeholder":"Password","required":""},domProps:{"value":(_vm.userData.pass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userData, "pass", $event.target.value)}}}),_vm._v(" "),(_vm.$store.state.modePage === 'login')?_c('div',[_c('label',{staticClass:"custom-control custom-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.restoreDataLogin),expression:"restoreDataLogin"}],staticClass:"custom-control-input",attrs:{"type":"checkbox","checked":""},domProps:{"checked":Array.isArray(_vm.restoreDataLogin)?_vm._i(_vm.restoreDataLogin,null)>-1:(_vm.restoreDataLogin)},on:{"change":function($event){var $$a=_vm.restoreDataLogin,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.restoreDataLogin=$$a.concat([$$v]))}else{$$i>-1&&(_vm.restoreDataLogin=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.restoreDataLogin=$$c}}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description"},[_vm._v("Запомнить логин и пароль")])])]):_vm._e(),_vm._v(" "),(_vm.errorsAuth)?_c('div',{staticClass:"alert alert-danger margin-bot-lg",attrs:{"role":"alert"}},[_vm._v("\n          "+_vm._s(_vm.messageError)+"\n        ")]):_vm._e(),_vm._v(" "),_c('input',{staticClass:"input-submit margin-top-md",attrs:{"type":"submit"},domProps:{"value":_vm.$store.state.modePage === 'login' ? 'Войти на сайт' : 'Зарегистрироваться'}})]),_vm._v(" "),_c('div',{staticClass:"main-authorization-footer margin-bot-lg"},[_c('span',[_vm._v(_vm._s(_vm.$store.state.modePage === 'login' ? 'New to Marh?': 'Registered on Marh?'))]),_vm._v(" "),_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.getAnotherPage($event)}}},[_vm._v(_vm._s(_vm.$store.state.modePage === 'login' ? 'Create a account': 'Sign in account.'))])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "x7p7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MainMenu_vue__ = __webpack_require__("SVxk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2288bda8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MainMenu_vue__ = __webpack_require__("JeYC");
function injectStyle (ssrContext) {
  __webpack_require__("Gvld")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2288bda8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MainMenu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2288bda8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MainMenu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "xJD8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  data() {
    return {};
  },
  watch: {
    '$route': function () {
      if (this.$router.currentRoute.name === 'Menu') {
        this.$store.state.nameControlButton = 'Меню';
      } else {
        this.$store.state.nameControlButton = 'Вернуться в меню';
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
});

/***/ }),

/***/ "z5Is":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_StartGame_vue__ = __webpack_require__("1+io");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28db50a0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_StartGame_vue__ = __webpack_require__("AufH");
function injectStyle (ssrContext) {
  __webpack_require__("5zwS")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-28db50a0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_StartGame_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28db50a0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_StartGame_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},["NHnr"]);
//# sourceMappingURL=app.e430a8099031506f01f5.js.map