<template>
  <div class="container-header">
    <div class="__name">
      <p>will</p>
      <p>dev</p>
    </div>
    <div class="__options">
      <div class="container__menu-items">
        <div class="menu-items" v-for="item in itemsMenu" :key="item">
          <v-btn
            v-if="item.isMobile"
            click="redirectTo(item.page, item?.isOutsidePage)"
          >
            {{ item.text }}
          </v-btn>
          <template v-if="item.isCollapseButton">
            <v-menu location="bottom" @click:outside="handleCollapse(item)" >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="__button"
                  :append-icon="getIcon(item)"
                  v-bind="props"
                  @click="handleCollapse(item)"
                >
                  Work
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(links, index) in item.dropdown"
                  :key="index"
                >
                  <v-btn
                    class="__list__item__button"
                    @click="redirectTo('/', false)"
                    >{{ links.text }}</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <div class="links">
            <v-btn v-for="links in item.dropdown" :key="links">
              {{ links.text }}</v-btn
            >
          </div>
        </div>
      </div>

      <div class="__options__github__linkeding">
        <v-btn @click="redirectTo('/', false)">
          <v-icon icon="mdi-github"  />
        </v-btn>
        <v-btn @click="redirectTo('/', false)">
          <v-icon icon="mdi-linkedin" />
        </v-btn>
        <span/>
        <v-btn @click="redirectTo('/', false)">
          <v-icon icon="mdi-weather-sunny" />
        </v-btn>
      </div>

      <v-overlay :model-value="overlay" class="align-center justify-center">
      </v-overlay>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    isMobile: false,
    isCollapsed: false,
    dropdown: [
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
    itemsMenu: [
      {
        text: 'Blog',
        page: '/',
        isMobile: true,
      },
      {
        text: 'FAQ',
        page: '',
        isMobile: true,
      },
      {
        text: 'Work',
        page: 'https://www.qualicorp.com.br/',
        isMobile: false,
        isCollapseButton: true,
        isCollapsed: true,
        isOutsidePage: true,
        dropdown: [
          {
            text: 'Services',
            page: '',
            isMobile: true,
          },
          {
            text: 'About',
            page: '',
            isMobile: true,
          },
          {
            text: 'Contact',
            page: '',
            isMobile: true,
          },
        ],
      },
    ],
  }),

  computed: {
    renderMenus() {
      return this.itemsMenu;
    },
  },
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
    handleCollapse(item) {
      item.isCollapsed = !item.isCollapsed;
    },  
    getIcon(item) {
        return !item.isCollapsed ? 'mdi-menu-down' : 'mdi-menu-right';
    },
  },
};
</script>
<style lang="scss" scoped>
.container-header {
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 20px 10px 20px 10px;

  .__name {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 24px;
    }

    p:nth-child(2) {
      color: var(--color-purple);
    }
  }

  .__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    .v-btn {
      background: transparent;
      border: none;
      box-shadow: none;
      font-size: 14px;
      border-radius: 30px;
      text-transform: none;
      color: var(--color-purple);
    }

    .container__menu-items {
      display: flex;
      flex-direction: row;
    }

    .__button {
      pointer-events: none;
    }

    .menu-items:nth-child(1),
    :nth-child(2) {
      .v-btn {
        color: var(--color-blue);
      }
    }

    .menu-items:nth-child(3) {
      display: flex;
      align-items: center;

      .v-btn {
        font-size: 16px;
        background-color: var(--background-color-button-purple);
      }

      @media (max-width: 900px) {
        .links {
          display: none !important;
        }
      }

      .links .v-btn:nth-child(2)::before {
        content: '';
        display: flex;
        position: absolute;
        left: 0;
        background-color: var(--color-purple);
        width: 3px;
        height: 3px;
        border-radius: 50%;
      }

      .links .v-btn:nth-child(3)::before {
        content: '';
        display: flex;
        position: absolute;
        left: 0;
        background-color: var(--color-purple);
        width: 3px;
        height: 3px;
        border-radius: 50%;
      }

      .links {
        display: flex;

        .v-btn {
          background-color: unset;
          color: var(--color-purple);
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    .__name {
      display: none;
    }

    .__options {
      max-height: 20px;

      .v-btn {
        font-size: 10px;
        margin: 0;
        padding: 0;
      }

      .__button {
        pointer-events: painted;
        padding: 0px 10px 0px 10px;

        ::v-deep .v-btn__content {
          font-size: 12px;
        }
      }
    }
  }
}
.__list__item__button {
  background: none;
  box-shadow: unset;
  color: var(--color-purple);
  ::v-deep .v-btn__content {
    font-size: 12px;
  }
}
.__options__github__linkeding {
  display: flex;
  gap: 10px;
  span{
    width: 1px;
    margin: 10px 0 10px 0;
    background-color: var(--color-silver);
  }
  .v-btn {
    min-width: unset;
    width: 20px;
    .v-icon {
      color: var(--color-silver-92-opacity)
    }
    }
   

}
</style>
