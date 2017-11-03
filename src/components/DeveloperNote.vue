<template>
  <div class="container">
    <div class="row">
      <article class="col-lg-12 main-menu">
        <h1 class="title-page">{{titlePage}}</h1>
          <article class="about-page">
            <section class="about-game-section">
              <h4 class="about-game-title"> Что это такое и зачем?</h4>
              <span class="about-game-text">Это обычное приложение для тренировки ментальной арифметики,
              <br>
              Которое я решил создать ради практики.
            </span>
            </section>
            <section class="about-game-section">
              <h4 class="about-game-title">#История:</h4>
              <span class="about-game-text">
                Однажды один человек написал,мол не у всех хорошо с устным счетом.Отсюда и родилась идея:)
              </span>
            </section>
            <section class="about-game-section">
              <h4 class="about-game-title">#Функции:</h4>
              <span class="about-game-text">
                #1.1 - Тренировка устного счета.
              </span>
              <span class="about-game-text">
                #1.2 - Увеличение скорости вычислений простых примеров.
              </span>
            </section>
            <section class="about-game-section">
              <h4 class="about-game-title">#Особенности:</h4>
              <span class="about-game-text">
                #1.1 - После каждый тренировки вы сразу же наблюдаете результат.
              </span>
              <span class="about-game-text">
                #1.2 - Вы можете соревноваться с друзьями,играя турнирный режим.
              </span>
              <span class="about-game-text">
                #1.3 - В игре присутствует 5 режимов,которые влияют на сложность примеров.
              </span>
            </section>
            <section class="about-game-section">
              <h4 class="about-game-title">#Рейтинг:</h4>
              <span class="about-game-text">
                #1.1 - Чтобы соревноваться с другими пользователями проделайте следующие инструкции:
                <span class="about-game-subtext">@1.1.1 - Зарегистрируйте аккаунт.</span>
                <span class="about-game-subtext">@1.1.2 - Войдите в аккаунт.</span>
                <span class="about-game-subtext">@1.1.3 - Зайдите в "Начать игру".</span>
                <span class="about-game-subtext">@1.1.3 - Поставьте турнирный режим,решайте примеры.</span>
                <span class="about-game-subtext">@1.1.4 - После завершения испытания ваш результат будет занесен в рейтинг</span>
              </span>
              <span class="about-game-text">
                #1.2 - Каждая новая игра в режиме "Турнир" заменяет ваш старый результат на новый.
              </span>
            </section>
            <section class="about-game-section">
              <h4 class="about-game-title">#Прочее:</h4>
              <span class="about-game-text">
                Ваши пожелания и замечание я буду рад учесть:
                <span class="about-game-subtext"><a href="https://vk.com/heyhodeonis" target="_blank">@vk</a> </span>
                <span class="about-game-subtext"><a href="https://web.telegram.org/#/im?p=@Dakotaz" target="_blank">@telegram</a> </span>
              </span>
            </section>
          </article>
      </article>
    </div>
  </div>
</template>

<script>
  export  default {
    name: 'RaitingUsers',
    data() {
      return {
        titlePage: 'Обо всём'
      }
    }
  }

</script>

<style >
  .main-menu {
    min-height: 420px;
    padding: 50px 50px;

    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: 2px solid black;

    background: beige;
  }

  .title-page {
    text-align: center;
  }

  .about-page {
    font-size: 19px;
  }

  .about-game-title {
    display: block;
    text-decoration-line: underline;
  }

  .about-game-text {
    display: block;
    margin-top: 2px;
    margin-left: 10px;
    margin-bottom: 7px;
  }

  .about-game-subtext {
    display: block;
    margin-top: 4px;
    margin-left: 15px;
    margin-bottom: 6px;
  }

</style>
