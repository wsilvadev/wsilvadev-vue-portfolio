<template>
  <v-card class="card-container">
    <div class="card-container__header">
        <img :src="logo" />
      <h2 class="card-container__header__title gradient-text "> {{ title }} </h2>
    </div>

    <div class="card-container__body">
      <div
        v-for="item in storeScreens" :key="item"  > 
        <img  :src="item"/>

      </div>
    </div>

    <div class="card-container__footer">
      <p class="card-container__footer__text"> {{ description }} </p>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ['logo', 'title', 'storeScreens', 'description'],
  data() {
    return {
    }
  },
  
};
</script>
<style lang="scss" scoped>
.card-container {
  background-color: var(--background-color-wrapper);
  border: 1px solid var(--color-silver-04-opacity);
  height: 800px;

  &__header {
    display: flex;
    width: 100%;
    height: 90px;


    &__title {
      padding: 20px 0px 0px 20px;
      font-size: 24px;
      font-weight: 400;
      font-family: var(--font-poppins);
    }
  }
  &__body {
    display: flex;
    gap: 20px;
    padding: 10px;
    width: 100%;
    height: 90%;
    overflow: scroll;
    img {
      width: 250px;
    }
  }
 
  &__footer {
    width: 100%;
    position: sticky;
    bottom: 20px;
    padding: 10px;
    height: 90px;
    &__text {
      font-size: 14px;
      font-weight: 200;
    }
    
  }
  @media  screen and (max-width: 900px){
    height: 450px;
    &__header {
      height: 60px;
      &__title {
        font-size: 12px;
      }
    }
    &__body {
      img {
        width: 100px;
      }
    }
    &__footer {
      bottom: 60px;
      &__text {
        font-size: 10px;
      }
    }
    
  }
}
</style>
