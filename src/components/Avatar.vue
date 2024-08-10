<script setup>
import { renderReactComponent } from './Animation/connection.jsx';
import { defineProps } from 'vue';
const props = defineProps({
  animation: {type: String, required: true}
})
console.log('pr', props)
onMounted(() => {
  const targetEl = document.getElementById('react-root');
  renderReactComponent(targetEl, props.animation);
});
</script>

<template>
  <div id="react-root"></div>
</template>
