<script lang="ts"></script>
<template>
  <div>
    <Header />
    <div class="container-profile">
      <div>left</div>
      <div class="container-avatar">
        <Avatar />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-profile {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
  width: 100vw;
  height: 100vh;

  background: red;
}
.container-avatar {
  width: 200px;
  margin: 30px 30px 0px 0px;
  background-color: blue;
}
</style>
