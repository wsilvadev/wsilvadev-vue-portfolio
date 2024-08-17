<script lang="ts"></script>
<template>
  <div>
    <Header />
    <div class="container-wrapper">
      <div class="__description">
        <div class="__title">
          <p>I’m
          <p class="gradient-text">Willian</p> Simões.</p>
          <span>creative and <b>technical</b> frontend <b>developer</b>.</span>
        </div>
        <div class="__hire_resume_button">
          <v-btn class="__hire">HIRE ME</v-btn>
          <v-btn class="gradient-text">RESUME</v-btn>
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
      <div class="__animation__avatar">
        <Avatar class="__animation_hiphop" animation="hiphop" idComponent="hiphop" v-if="animationName === 'hiphop'" />

        <Avatar class="__animation_running" animation="running" idComponent="running"
          v-else="animationName === 'running'" />
      </div>
      <div class="container__marketing">
        <div class="__marketing">
          <div class="__marketing__title">
            <v-img v-if="isMobile" src="../../assets/marketing/mobile_clean.png" />
            <v-img v-else src="../../assets/marketing/clean.png" />
            <p>
              Clean & Modern Style
            </p>
          </div>
          <p class="__marketing__description">
            Enjoys creating modern, clean designs and intuitive user interface.
          </p>
        </div>
        <div class="__marketing">
          <div class="__marketing__title">
            <v-img v-if="isMobile" src="../../assets/marketing/mobile_heart.png" />
            <v-img v-else src="../../assets/marketing/heart.png" />
            <p>
              Detail Oriented
            </p>
          </div>
          <p class="__marketing__description">
            The biggest challenges: accessibility, browser compatibility and responsive design.
          </p>

        </div>
        <div class="__marketing">
          <div class="__marketing__title">
            <v-img v-if="isMobile" src="../../assets/marketing/mobile_optimized.png" />
            <v-img v-else src="../../assets/marketing/optimized.png" />
            <p>Fast & Optimized</p>
          </div>
          <p class="__marketing__description">
            Writing structured, optimal and efficient code.
          </p>

        </div>
      </div>

    </div>
    <div class="container-cards">
      <v-skeleton-loader v-for="n in 3" :key="n" class="card__item" type="list-item-avatar, image, list-item-avatar"
        v-if="loading"></v-skeleton-loader>
      <Card v-else v-for="item in repositories" :key="item" class="card__item" mdicon="mdi-github" :title="item.name"
        :description="item.description" :language="item.language" />
    </div>
  </div>
</template>
<script>
import { useRepositories } from '../../stores/app'

export default {
  data() {
    return {
      animated: '',
      repositories: [],
      animationName: 'running',
      isMobile: false,
      loading: false,
      mediaQuery: window.matchMedia('(max-width: 900px)')
    };
  },
  methods:{
    handleAnimation(name){
      this.animationName = name;

    }, 
    updateIcons() {

    },
     async getRepositories(){
      try {
      this.loading = true
    const repositories = useRepositories();
        await repositories.fetchRepositories()

      this.repositories = repositories.getRepositories
    } catch (err) {
      console.error(err);
    }  finally {
      this.loading = false
    }
     }

  },
  async mounted() {
    this.mediaQuery.addEventListener('change', (item)=>{this.isMobile = item.matches});
  
await this.getRepositories()

  },
  beforeDestroy() {
    this.mediaQuery.removeEventListener('change', (item)=>{this.isMobile = item.matches});
  },
  watch: {
    animationName(val) {
    },
    mediaQuery: {
      handler(val) {
      this.isMobile = val.matches

      },
      immediate: true


    }
  }
};

</script>
<style scoped>
@import url('../../styles/settings.scss');

.container-wrapper {
  display: flex;
  height: 6in;
  /* usando o in é mesma coisa de usar calc(2 * 6 * 96px); para pegar a polegada do monitor */
  background-color: var(--background-color-wrapper);
  position: relative;


  .__description {
    width: 100%;
    display: flex;
    padding: 15vh 0 0 20vw;
    flex-direction: column;


    .__title {
      display: flex;
      flex-direction: column;

      p {
        display: inline;
        font-size: 50px;
        white-space: nowrap;
        font-family: var(--font-poppins);
        font-weight: 900;
        color: var(--color-silver-72-opacity);
      }

      p>p {
        color: var(--color-purple);
      }

      span {
        font-weight: 400;
        font-size: 24px;
      }
    }

    .__hire_resume_button {
      display: flex;
      gap: 20px;
      width: 100%;
      margin-top: 20px;

      .v-btn {
        border: none;
        box-shadow: none;
        height: 42px;
        width: 150px;
      }

      .__hire {
        background: linear-gradient(120deg, var(--color-purple) 50%, var(--color-blue) 100%);
        color: #fff;
      }
    }

    .__stacks {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 100px;

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
    width: 100vw;
    height: 100vh;

    .__avatar {
      display: flex;
      width: 300px;
      max-height: 480px;
      background: linear-gradient(120deg, var(--color-purple) 50%, var(--color-blue) 100%);
      border-radius: 0px 0px 37% 37%;
      position: relative;


      .v-img {
        bottom: 0;
        z-index: 1;
        overflow: visible;
      }

      ::v-deep .v-img__img--contain {
        object-fit: cover;
      }

      ::v-deep .v-img__img {
        left: -105px;
        z-index: 9999;
        top: 20px;
        transform: rotate(-10deg);
        min-width: 360px;
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
      box-shadow: 0px 280px 0px 0px var(--background-color-wrapper);
      z-index: 2;
    }
  }
}

.container-jobs {
  position: relative;
  background-color: #fff;
  width: 100%;

  z-index: 3;

  .__animation__avatar {
    display: none;
    /** revisar classe */
    justify-content: flex-end;
    width: 100%;
    height: 300px;

    .__animation_running {
      position: absolute;
      right: 5%;
      height: 250px;
      z-index: 10;


    }

    .__animation_hiphop {
      position: absolute;
      left: 30%;
      height: 250px;
      z-index: 10;


    }
  }

  .container__marketing {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: -60px;
    left: 20%;
    width: 67%;
    gap: 40px;
    min-height: 198px;

    .__marketing {
      width: 100%;
      min-height: 100%;
      flex: 1 1 30%;
      background-color: #fff;
      justify-content: flex-start;
      padding: 40px;
      border: 1px solid var(--color-silver-04-opacity);



      .__marketing__title {
        margin-bottom: 10px;

        p {
          font-size: 18px;
          margin-top: 10px;
          font-weight: 700;
          color: var(--color-silver-92-opacity);
        }

        .v-img {
          width: 50px;
        }
      }

      .__marketing__description {
        font-size: 14px;
        font-weight: 200;
        color: var(--color-silver-82-opacity);

      }

      .v-btn {
        margin-top: 10px;
        border: none;
        box-shadow: none;
        background-color: var(--background-color-button-purple);
        border-radius: 30px;
        color: var(--color-purple);
      }

    }
  }

}

.container-cards {
  display: flex;
  margin: 0px 80px 0px 250px;
  overflow-x: scroll;
  gap: 20px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  .card__item {
    flex: 0 0 33.33%;
    transition: transform 0.3s ease-in-out;
    box-sizing: border-box;
    scroll-snap-align: start;
  }


}

.container-cards .card__item:hover {
  transform: scale(1.05);
}

@media (hover: none) {
  .container-cards .card__item {
    transition: transform 0.3s ease-in-out;
  }

  .container-cards .card__item:active {
    transform: scale(1.1);
  }
}

@media screen and (max-width: 1100px) {
  .container-wrapper {

    .container__avatar {
      display: none;
    }
  }

}

@media screen and (max-width: 900px) {
  .container-wrapper {
    display: flex;
    height: 50vh;
    width: 100%;
    background-image: url('../../assets/vignette.svg'), url('../../assets/bg.svg');
    background-size: cover, cover;
    background-position: center, center;
    background-repeat: no-repeat, no-repeat;


    .__description {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 0;
      padding-left: 20px;
      position: relative;

      .__title {

        p {
          font-size: 35px;
        }

        span {
          font-size: 17px;
        }

      }

      .__hire_resume_button {
        margin: 10px 0 90px 0;
        gap: 2px;
      }

      .__stacks {
        display: flex;
        bottom: 60px;
        left: 20px;

        p {
          font-size: 12px;
        }

        .__stacks__item {

          .v-icon {
            font-size: 20px;
          }
        }
      }
    }


  }

  .container-jobs {
    height: 400px;

    .__animation__avatar {
      height: 100%;

      .__animation_running {
        bottom: 80px;
        right: -110px;
      }
    }

    .container__marketing {
      display: flex;
      position: absolute;
      top: -60px;
      margin: 0px 20px 0px 20px;
      left: 0;
      gap: 40px;
      width: auto;
    }



    .__marketing {
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      padding: 20px !important;

      .__marketing__title {
        display: flex;
        align-items: center;
        width: max-content;
        height: 20px;

        p {
          font-size: 16px !important;
          margin-top: 0 !important;
        }

        ::v-deep .v-img__img {
          height: 20px;
        }
      }

    }
  }

  .container-cards {
    gap: 30px;
    margin: 20px;

    .card__item {
      flex: 0 0 80%;
    }

  }
}
</style>
