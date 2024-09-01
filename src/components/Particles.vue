<template>
    <div id="particles-js"></div>
  </template>
  
  <script>
  import particlesJSON from '../utils/particles.json'
  export default {
    name: 'ParticlesComponent',
    mounted() {
      const particlesScript = document.createElement('script')
      particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
      document.head.appendChild(particlesScript)
  
      particlesScript.onload = () => {
        particlesJS('particles-js', particlesJSON)
      }
    }
  }
  </script>
  
  <style scoped>
  #particles-js {
    position: absolute;
    width: 70%;
    z-index: 1;
    height: 100%;
    top: 0;
    right: 0;
    background-color: transparent;
    overflow: hidden;
  }
  @media (max-width: 750px) {
    #particles-js {
    width: 100%;
  
  }
  }
  </style>