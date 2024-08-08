<script setup>

</script>

<template>
  <v-layout
    class="overflow-visible"
    style="height: 56px;"
  >
    <v-bottom-navigation
      v-model="value"
      active
    >
      <v-btn>Home</v-btn>

      <v-btn>Recents</v-btn>

      <v-btn>Favorites</v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped> 
</style>