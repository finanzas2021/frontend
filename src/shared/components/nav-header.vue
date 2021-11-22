<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <a-row type="flex">
      <a-col flex="auto">
        <div :style="{ float: 'left' }">
          <a href="#" :style="{ color: 'white', fontWeight: 'bold' }">Legiz</a>
          <a-divider type="vertical" />
        </div>
        <a-menu
          v-if="forCustomer"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="menu in menuHeaderMainCustomer" :key="menu.name">
            {{ menu.title }}
          </a-menu-item>
        </a-menu>

        <a-menu
          v-else-if="forLawyer"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="menu in menuHeaderMainLawyer" :key="menu.name">
            {{ menu.title }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="150px">
        <a href="#" v-if="loggedIn" :style="{ float: 'right', color: 'white' }">log out</a>
        <a href="#" v-else>Log in</a>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const menuHeaderMainCustomer = [
  { title: "Profile", name: "Profile" },
  { title: "Lawyers", name: "Lawyers" },
  { title: "About", name: "About" },
];

const menuHeaderMainLawyer = [
  { title: "Profile", name: "Profile" },
  { title: "About", name: "About" },
];

const menuHeaderLoggedIn = [
  { title: "Log in", name: "LogIn", loggedIn: false },
  { title: "Log out", name: "LogOut", loggedIn: false },
];

export default {
  name: "nav-header",
  setup() {
    const store = useStore();

    return {
      forCustomer: computed(() => !!store.getters.auth.forCustomer),
      forLawyer: computed(() => !!store.getters.auth.forLawyer),
      loggedIn: computed(() => store.state.auth.status.loggedIn),
      menuHeaderMainCustomer,
      menuHeaderMainLawyer,
      menuHeaderLoggedIn,
    };
  },
};
</script>

<style scoped lang="less">
.display-none {
  display: none !important;
}
</style>
