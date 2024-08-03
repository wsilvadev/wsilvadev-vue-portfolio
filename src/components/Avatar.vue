<script setup>
import { renderReactComponent } from './Animation/connection.jsx';

onMounted(() => {
  const targetEl = document.getElementById('react-root');
  renderReactComponent(targetEl);
});
</script>

<template>
  <div id="react-root"></div>
</template>
