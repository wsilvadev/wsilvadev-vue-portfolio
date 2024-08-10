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
        <div class="__hire_resume_button">
            <v-btn class="__hire">HIRE ME</v-btn>
            <v-btn class="__resume" >RESUME</v-btn>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      animated: '',
      animationName: 'running',
      isMobile: false,
      mediaQuery: window.matchMedia('(max-width: 900px)')
    };
  },
  methods:{
    handleAnimation(name){
      this.animationName = name;

    }, 
    updateIcons() {

    }

  },
  mounted() {
    this.mediaQuery.addEventListener('change', (item)=>{this.isMobile = item.matches});
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
.container-wrapper {
  display: flex;
  height: 60vh;
  background-color: var(--background-color-wrapper);


  .__description {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15vh 0 0 20vw;
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
        font-weight: 400;
        font-size: 24px;
      }
    }
    .__hire_resume_button {
        display: flex;
        gap: 20px;
        width: 100%;
        margin: 2vh 0 4vh 0;

        .v-btn {
          border: none;
          box-shadow: none;
          height: 42px;
          width: 150px;
        }
        .__hire {
          background-color: var(--color-purple);
          color: #fff;
        }
        .__resume {
          background-color: transparent;
          color: var(--color-purple);
        }
      }
    .__stacks {
      display: flex;
      flex-direction: column;
      margin-bottom: 10vh;

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
      max-height: 450px;
      background-color: var(--color-purple);
      border-radius: 0px 0px 40% 40%;
      padding-top: 10vh;
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
        left: -90px;
        z-index: 9999;
        top: 20px;
        transform: rotate(-10deg);
        min-width: 270px;
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
  height: 100vh;
  z-index: 3;

  .__animation__avatar {
    display: flex;
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
    position: absolute;
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

@media screen and (max-width: 900px) {
  .container-wrapper {
    display: flex;
    height: 50vh;
    width: 100%;
    background-image:  url('../../assets/vignette.svg'), url('../../assets/bg.svg');
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
          font-size: 40px;

        }

        span {
          font-size: 20px;
        }

      }
      .__hire_resume_button {
        margin: 10px 0 90px 0;
      }

      .__stacks {
        display: flex;
        margin-bottom: 0;
        left: 0;
      }
    }

    .container__avatar {
      display: none;
    }

  }

  .container-jobs {
    height: 600px;

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
}
</style>
