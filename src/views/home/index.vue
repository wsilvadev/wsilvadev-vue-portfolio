<template>
  <div class="home-container">
    <!-- Animated background square -->
    <div id="square" class="animated-square"></div>

    <!-- Main hero section -->
    <div class="container-wrapper">
      <Particles class="particles-container" />

      <div class="__description" data-aos="fade-right" data-aos-duration="1000">
        <div class="__title">
          <span class="title-line">
            I'm.
            <p class="gradient-text animate-text">Willian</p>
            Simões.
          </span>
          <span class="__details animate-fade-in">creative and <b>technical</b> frontend <b>developer</b>.</span>
        </div>

        <div class="__hire_resume_button" data-aos="fade-up" data-aos-delay="300">
          <v-btn class="__hire animate-button" disabled>
            HIRE ME
            <v-tooltip activator="parent" location="end">Developing</v-tooltip>
          </v-btn>
          <v-btn disabled class="gradient-text animate-button">
            <v-tooltip activator="parent" location="end">Developing</v-tooltip>
            RESUME
          </v-btn>
        </div>

        <div class="__stacks" data-aos="fade-up" data-aos-delay="600">
          <p class="stacks-title">tech stack / tools favorit:</p>
          <div class="__stacks__item">
            <div class="tech-icon" data-aos="zoom-in" data-aos-delay="700">
              <v-icon icon="mdi-language-typescript" />
            </div>
            <div class="tech-icon" data-aos="zoom-in" data-aos-delay="800">
              <v-icon icon="mdi-vuejs" />
            </div>
            <div class="tech-icon" data-aos="zoom-in" data-aos-delay="900">
              <v-img src="../../assets/stack/pwa-icon.webp" />
            </div>
            <div class="tech-icon" data-aos="zoom-in" data-aos-delay="1000">
              <v-icon icon="mdi-git" />
            </div>
            <div class="icon-react-native tech-icon" data-aos="zoom-in" data-aos-delay="1100">
              <v-icon icon="mdi-react" />
              React Native
            </div>
            <div class="tech-icon" data-aos="zoom-in" data-aos-delay="1200">
              <v-icon icon="mdi-android" />
            </div>
            <div class="tech-icon" data-aos="zoom-in" data-aos-delay="1300">
              <v-icon icon="mdi-apple-ios" />
            </div>
          </div>
        </div>
      </div>

      <div class="container__avatar" data-aos="fade-left" data-aos-duration="1200">
        <div class="__avatar floating-animation">
          <v-img src="../../assets/avatar.png" class="avatar-image" />
        </div>
      </div>
    </div>

    <!-- Marketing section -->
    <div class="container-jobs">
      <div class="container__marketing">
        <div class="__marketing marketing-card" data-aos="fade-up" data-aos-delay="200">
          <div class="__marketing__title">
            <v-img v-if="isMobile" src="../../assets/marketing/mobile_clean.png" class="marketing-icon" />
            <v-img v-else src="../../assets/marketing/clean.png" class="marketing-icon" />
            <p>Clean & Modern Style</p>
          </div>
          <p class="__marketing__description">
            Enjoys creating modern, clean designs and intuitive user interface.
          </p>
        </div>

        <div class="__marketing marketing-card" data-aos="fade-up" data-aos-delay="400">
          <div class="__marketing__title">
            <v-img v-if="isMobile" src="../../assets/marketing/mobile_heart.png" class="marketing-icon" />
            <v-img v-else src="../../assets/marketing/heart.png" class="marketing-icon" />
            <p>Detail Oriented</p>
          </div>
          <p class="__marketing__description">
            The biggest challenges: accessibility, browser compatibility and responsive design.
          </p>
        </div>

        <div class="__marketing marketing-card" data-aos="fade-up" data-aos-delay="600">
          <div class="__marketing__title">
            <v-img v-if="isMobile" src="../../assets/marketing/mobile_optimized.png" class="marketing-icon" />
            <v-img v-else src="../../assets/marketing/optimized.png" class="marketing-icon" />
            <p>Fast & Optimized</p>
          </div>
          <p class="__marketing__description">
            Writing structured, optimal and efficient code.
          </p>
        </div>
      </div>
    </div>

    <!-- Projects cards section -->
    <div class="container-cards" id="cards">
      <Card class="card__item" :logo="mocks.megarepasse.logo" :title="mocks.megarepasse.name"
        :description="mocks.megarepasse.description" :storeScreens="mocks.megarepasse.storeScreens" data-aos="fade-left"
        data-aos-delay="200" />
      <Card class="card__item" :logo="mocks.qualicorp.logo" :title="mocks.qualicorp.name"
        :description="mocks.qualicorp.description" :storeScreens="mocks.qualicorp.storeScreens" data-aos="fade-left"
        data-aos-delay="400" />
      <Card class="card__item" :logo="mocks.clube.logo" :title="mocks.clube.name" :description="mocks.clube.description"
        :storeScreens="mocks.clube.storeScreens" data-aos="fade-left" data-aos-delay="600" />
    </div>
  </div>
</template>

<script>
import { useRepositories } from '../../stores/app'
import mocks from '@/mocks/applications.js'
import Particles from '../../components/Particles.vue'

export default {
  name: 'HomeView',
  components: {
    Particles
  },
  data() {
    return {
      animated: '',
      repositories: [],
      animationName: 'running',
      isMobile: false,
      loading: false,
      mediaQuery: window.matchMedia('(max-width: 900px)'),
      mocks
    };
  },
  methods: {
    handleAnimation(name) {
      this.animationName = name;
    },

    updateIcons() {
      // Placeholder for icon updates
    },

    async getRepositories() {
      try {
        this.loading = true
        const repositories = useRepositories();
        await repositories.fetchRepositories()
        this.repositories = repositories.getRepositories
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false
      }
    },

    // Add intersection observer for scroll animations
    setupScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe all elements with data-aos
      document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
      });
    }
  },

  async mounted() {
    this.mediaQuery.addEventListener('change', (item) => {
      this.isMobile = item.matches;
    });

    // Setup scroll animations
    this.$nextTick(() => {
      this.setupScrollAnimations();
    });
  },

  beforeDestroy() {
    this.mediaQuery.removeEventListener('change', (item) => {
      this.isMobile = item.matches;
    });
  },

  watch: {
    animationName(val) {
      // Animation name watcher
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

<style scoped lang="scss">
@import url('../../styles/settings.scss');

.home-container {
  overflow-x: hidden;
}

// Animated background square
.animated-square {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: linear-gradient(45deg, var(--color-purple), var(--color-blue));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05;
  z-index: -1;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
  }
}

.container-wrapper {
  display: flex;
  height: 6in;
  background-color: var(--background-color-wrapper);
  position: relative;
  overflow: hidden;

  // Enhanced scroll animation
  animation: slideInFromBottom 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .__description {
    width: 100%;
    display: flex;
    padding: 15vh 0 0 20vw;
    flex-direction: column;
    z-index: 2;
    position: relative;

    .__title {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      .title-line {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 50px;
        white-space: nowrap;
        font-family: var(--font-poppins);
        font-weight: 900;
        color: var(--color-silver-72-opacity);
        animation: slideInFromLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      span,
      p {
        display: inline;
        font-size: 50px;
        white-space: nowrap;
        font-family: var(--font-poppins);
        font-weight: 900;
        color: var(--color-silver-72-opacity);
      }

      span>p {
        color: var(--color-purple);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-purple), var(--color-blue));
          animation: expandWidth 1.5s ease-out 0.5s forwards;
        }
      }

      .__details {
        font-weight: 400;
        font-size: 24px;
        opacity: 0;
        animation: fadeInUp 1s ease-out 0.8s forwards;
      }
    }

    .__hire_resume_button {
      display: flex;
      gap: 20px;
      width: 100%;
      margin-top: 20px;
      opacity: 0;
      animation: fadeInUp 1s ease-out 1s forwards;

      .v-btn {
        border: none;
        box-shadow: none;
        height: 42px;
        width: 150px;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        &:hover::before {
          left: 100%;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
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
      opacity: 0;
      animation: fadeInUp 1s ease-out 1.2s forwards;

      .stacks-title {
        color: var(--color-silver-50-opacity);
        font-weight: 500;
        margin-bottom: 15px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .__stacks__item {
        display: flex;
        flex-direction: row;
        width: 200px;
        color: var(--color-silver);
        gap: 15px;

        .tech-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;

          &:hover {
            transform: scale(1.2) rotate(5deg);
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
        }

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
    z-index: 2;

    .__avatar {
      display: flex;
      width: 300px;
      max-height: 480px;
      background: linear-gradient(120deg, var(--color-purple) 50%, var(--color-blue) 100%);
      border-radius: 0px 0px 37% 37%;
      position: relative;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }

      .avatar-image {
        bottom: 0;
        z-index: 1;
        overflow: visible;
        transition: all 0.3s ease;
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
        transition: all 0.3s ease;
      }

      &:hover ::v-deep .v-img__img {
        transform: rotate(-5deg) scale(1.05);
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

// Floating animation for avatar
.floating-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.container-jobs {
  position: relative;
  background-color: #fff;
  width: 100%;
  z-index: 3;
  padding: 80px 0;

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
      border-radius: 20px;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--color-purple), var(--color-blue));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border-color: var(--color-purple);

        &::before {
          opacity: 0.05;
        }

        .__marketing__title p {
          color: var(--color-purple);
        }

        .marketing-icon {
          transform: scale(1.1) rotate(5deg);
        }
      }

      .__marketing__title {
        margin-bottom: 20px;
        transition: all 0.3s ease;

        p {
          font-size: 18px;
          margin-top: 10px;
          font-weight: 700;
          color: var(--color-silver-92-opacity);
          transition: color 0.3s ease;
        }

        .marketing-icon {
          width: 50px;
          transition: all 0.3s ease;
        }
      }

      .__marketing__description {
        font-size: 14px;
        font-weight: 200;
        color: var(--color-silver-82-opacity);
        line-height: 1.6;
        transition: all 0.3s ease;
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
  padding: 40px 0;

  .card__item {
    flex: 0 0 80%;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-sizing: border-box;
    scroll-snap-align: start;
    transform: scale(0.95);
    opacity: 0.8;

    &:hover {
      transform: scale(1.02);
      opacity: 1;
    }
  }
}

// Enhanced animations
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

// AOS (Animate On Scroll) fallback styles
[data-aos] {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

[data-aos].animate-in {
  opacity: 1;
  transform: translateY(0);
}

// Mobile-specific animation adjustments
@media screen and (max-width: 900px) {

  // Adjust animation timing for mobile performance
  [data-aos] {
    transition-duration: 0.6s; // Slightly faster on mobile
  }

  // Reduce floating animation intensity on mobile
  .floating-animation {
    animation-duration: 8s; // Slower and smoother
  }

  // Adjust background square for mobile
  .animated-square {
    width: 400px;
    height: 400px;
    animation-duration: 8s; // Slower rotation
  }
}

// Responsive design
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
          font-size: 33px;
        }

        .title-line {
          font-size: 33px;
        }

        span {
          font-size: 33px;
        }

        .__details {
          font-size: 16px;
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

// Additional mobile optimizations for very small screens
@media screen and (max-width: 600px) {

  // Adjust layout for very small screens
  .container-wrapper {
    .__description {
      padding-left: 15px;

      .__stacks {
        .stacks-title {
          font-size: 12px;
          font-weight: 600;
          margin: 0;
        }
      }

      .__title {

        p,
        span {
          font-size: 28px;
        }

        .__details {
          font-size: 14px;
        }
      }

      .__stacks {
        left: 15px;
        bottom: 50px;
      }
    }
  }

  .container-jobs {
    height: 600px;
    margin-top: 30px;

    .container__marketing {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
  }

  .container-cards {
    margin: 15px;
    gap: 20px;
  }
}

// Smooth scrolling for the entire page
html {
  scroll-behavior: smooth;
}

// Enhanced focus states for accessibility
button:focus,
.v-btn:focus {
  outline: 2px solid var(--color-purple);
  outline-offset: 2px;
}

// Loading states
.loading {
  opacity: 0.6;
  pointer-events: none;
}

// Performance optimizations
* {
  will-change: transform, opacity;
}

// Mobile-specific performance optimizations
@media screen and (max-width: 900px) {

  .animated-square,
  .floating-animation,
  .tech-icon {
    will-change: auto; // Reduce GPU usage on mobile
  }

  // Optimize transitions for mobile
  .tech-icon,
  .__marketing,
  .card__item {
    transition-duration: 0.2s; // Faster transitions on mobile
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
