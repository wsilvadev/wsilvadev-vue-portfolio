<template>
  <div class="container-header">
    <div class="__name">
      <p>will</p>
      <p>dev</p>
    </div>
    <div class="__options">
      <div class="menu-items" v-for="item in itemsMenu" :key="item">
        <v-btn
          :append-icon="item?.icon"
          @click="redirectTo(item.page, item?.isOutsidePage)"
        >
          {{ item.text }}
        </v-btn>
      </div>
      <v-overlay :model-value="overlay" class="align-center justify-center">
        <Avatar />
      </v-overlay>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    itemsMenu: [
      {
        text: 'Blog',
        page: '/',
      },
      {
        text: 'FAQ',
        page: '',
      },
      {
        text: 'Work',
        page: 'https://www.qualicorp.com.br/',
        isOutsidePage: true,
        icon: 'mdi-menu-right',
      },
      {
        text: 'Services',
        page: '',
      },
      {
        text: 'About',
        page: '',
      },
      {
        text: 'Contact',
        page: '',
      },
    ],
  }),
  methods: {
    redirectTo(page, outside_url) {
      this.overlay = !this.overlay;
      setTimeout(() => {
        this.overlay = false;
         if (outside_url) window.open(page, '_blank');
         else {
          this.$router.push(page);
        }
      }, 4000);
    },
  },
};
</script>
<style lang="scss" scoped>
.container-header {
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 30px;
  .__name {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-weight: bold;
      font-size: 25px;
    }
    p:nth-child(2) {
      color: var(--purple);
    }
  }
  .__options {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .v-btn {
      background: transparent;
      border: none;
      box-shadow: none;
      font-size: 12px;
      border-radius: 30px;
      text-transform: none;
      color: var(--purple);
    }
    .menu-items:nth-child(1),
    :nth-child(2) {
      .v-btn {
        color: var(--blue);
      }
    }
    .menu-items:nth-child(3) {
      .v-btn {
        font-size: 16px;
        background-color: var(--background-button-purple);
      }
    }
    .menu-items:nth-child(4)::after {
      content: '';
      display: inline-block;
      background-color: var(--purple);
      width: 3px;
      height: 3px;
      border-radius: 50%;
    }
    .menu-items:nth-child(5)::after {
      content: '';
      display: inline-block;
      background-color: var(--purple);
      width: 3px;
      height: 3px;
      border-radius: 50%;
    }
  }
}
</style>
