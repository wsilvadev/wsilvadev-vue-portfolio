<script lang="ts"></script>
<template>
  <div>
    <Header />
    <div class="container-wrapper">
      <div class="__description">

        
      </div>
      <div class="__avatar"></div>
    </div>
  </div>
</template>
<style scoped>
.container-wrapper {
  display: flex;
  justify-content: space-between;
  height: 40vh;

  & .__description {
    width: 100%;
    background: red
  }
  & .__avatar {
    width: 100%;
    background: blue;
  }
}
</style>
