<script setup>
import { renderReactComponent } from './Animation/connection.jsx';
import { defineProps } from 'vue';
const props = defineProps({
  animation: {type: String, required: true},
  idComponent: {type: String, required: true}
})
onMounted(() => {
  const targetEl = document.getElementById(props.idComponent);
  renderReactComponent(targetEl, props.animation);
});
</script>

<template>
  <div :id="props.idComponent"></div>
</template>
