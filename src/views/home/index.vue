<script lang="ts"></script>
<template>
  <div>
    <Header />
    <div class="container-wrapper">
      <div class="__description">
        <div class="__title">
          <p>I’m
          <p>Willian</p> Simões.</p>
          <span>creative and <b>technical</b> frontend <b>developer</b>.</span>
        </div>
        <div class="__stacks">
          <p>tech stack / tools favorit saat ini:</p>
          <div class="__stacks__item">
            <v-icon icon="mdi-language-typescript" />
            <v-icon icon="mdi-vuejs" />
            <v-img src="../../assets/stack/pwa-icon.webp" />
            <v-icon icon="mdi-git" />
            <div class="icon-react-native">
              <v-icon icon="mdi-react" />
              React Native
            </div>
            <v-icon icon="mdi-android" />
            <v-icon icon="mdi-apple-ios" />
          </div>
        </div>

      </div>
      <div class="container__avatar">
        <div class="__avatar">
          <v-img src="../../assets/avatar.png" />
        </div>
      </div>
    </div>
    <div class="container-jobs">
      <div class="container__marketing">
        <div class="__marketing">
          <v-img src="../../assets/marketing/clean.png" />
          <div class="__marketing__title">
            Clean & Modern Style
          </div>
          <div class="__marketing__description">
            Senang membuat design yang modern, clean serta UI yang intuitif.
          </div>
        </div>
        <div class="__marketing">
          <v-img src="../../assets/marketing/heart.png" />
          <div class="__marketing__title">
            Detail Oriented
          </div>
          <div class="__marketing__description">
            Tantangan terbesarnya: aksesibilitas, browser kompatibilitas dan desain responsive.
          </div>
        </div>
        <div class="__marketing">
          <v-img src="../../assets/marketing/optimized.png" />
          <div class="__marketing__title">
            Fast & Optimized
          </div>
          <div class="__marketing__description">
            Penulisan code yang terstruktur, optimal serta efisien.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-wrapper {
  display: flex;
  justify-content: space-between;
  height: 60vh;
  background-color: var(--background-color-wrapper);

  .__description {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10% 0 0 20%;
    flex-direction: column;

    .__title {
      display: flex;
      flex-direction: column;

      p {
        display: inline;
        font-size: 50px;
        font-family: var(--font-poppins);
        font-weight: 900;
        color: var(--color-silver-72-opacity);
      }

      p>p {
        color: var(--color-purple);
      }

      span {
        font-weight: 300;
      }
    }

    .__stacks {
      display: flex;
      flex-direction: column;
      margin-bottom: 20%;

      p {
        color: var(--color-silver-50-opacity);
        font-weight: 500;
      }

      .__stacks__item {
        display: flex;
        flex-direction: row;
        width: 200px;
        color: var(--color-silver);

        .v-img {
          width: 20px;
          height: 20px;
          padding: 0;
        }

        .icon-react-native {
          .v-icon {
            font-size: 25px;
          }

          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 7px;
        }
      }
    }
  }

  .container__avatar {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80%;
    background-color: var(--background-color-wrapper);

    .__avatar {
      display: flex;
      min-width: 389px;
      height: 90%;
      position: relative;
      border-radius: 0 0 45% 45%;

      .v-img {
        bottom: 0;
        z-index: 1;
        overflow: visible;
        background-color: var(--color-purple);
        max-width: 389px;
      }

      ::v-deep .v-img__img--contain {
        object-fit: cover;
      }

      ::v-deep .v-img__img {
        left: -90px;
        z-index: 9999;
        top: 20px;
        transform: rotate(-10deg);
      }
    }

    .__avatar::before {
      content: '';
      width: 100%;
      height: 70%;
      bottom: 0;
      position: absolute;
      background-color: transparent;
      border-radius: 0 0 45% 45%;
      box-shadow: 38px 200px 0px 38px var(--background-color-wrapper);
      z-index: 2;
    }
  }
}

.container-jobs {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  z-index: 3;

  .container__marketing {
    display: flex;
    justify-content: stretch;
    position: absolute;
    top: -60px;
    left: 20%;
    width: 67%;
    height: 198px;
    gap: 40px;

    .__marketing {
      width: 100%;
      height: 100%;
      background-color: #fff;
      justify-content: flex-start;
      padding: 40px;
      border: 1px solid var(--color-silver-04-opacity);

      .v-img {
        width: 50px;
      }

      .__marketing__title {
        font-size: 18px;
        font-weight: 700;
        color: var(--color-silver-92-opacity);
        margin-top: 10px;
        margin-bottom: 5px;
      }
      .__marketing__description {
        font-size: 14px;
        font-weight: 200;
        color: var( --color-silver-82-opacity);
      }
    }
  }
}
</style>
