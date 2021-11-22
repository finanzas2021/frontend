<template>
<!--  <a-config-provider :locale="locale">-->
<!--    <a-layout id="finance">-->
<!--      <a-layout-sider-->
<!--        breakpoint="lg"-->
<!--        collapsed-width="0"-->
<!--        :trigger="null"-->
<!--        collapsible-->
<!--        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"-->
<!--      >-->
<!--        <div class="logo" />-->
<!--        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">-->
<!--          <a-menu-item key="user">-->
<!--            <span class="nav-text">Giancarlo</span>-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="cartera" @click="onClick('Portfolio')">-->
<!--            <ProfileOutlined />-->
<!--            <span class="nav-text">Cartera</span>-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="historia" @click="onClick('History')">-->
<!--            <HistoryOutlined />-->
<!--            <span class="nav-text">Historia</span>-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--      </a-layout-sider>-->
<!--      <a-layout :style="{ marginLeft: '200px' }">-->
<!--        <a-layout-content :style="{ margin: '4px 16px 0', overflow: 'initial' }">-->
<!--          <div :style="{ padding: '14px', background: '#fff', textAlign: 'center' }">-->
<!--            <router-view />-->
<!--          </div>-->
<!--        </a-layout-content>-->
<!--      </a-layout>-->
<!--    </a-layout>-->
<!--  </a-config-provider>-->

  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Usuario">
      <a-input />
    </a-form-item>
    <a-form-item label="Contraseña">
      <a-input />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary">Ingresar</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { ProfileOutlined, HistoryOutlined } from "@ant-design/icons-vue";
import esEs from "ant-design-vue/es/locale/es_ES";
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

const menuItems = [
  { title: "Cartera", name: "Portfolio" },
  { title: "Historial", name: "History" },
];
export default {
  name: "app",
  components: {
    ProfileOutlined,
    HistoryOutlined,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const locale = ref(esEs);
    const selectedKeys = ref([]);

    const onClick = (name) => {
      router.push({ name: name });
    };

    watchEffect(
      () => {
        selectedKeys.value = [`${route.name}`];
      },
      {
        flush: "post",
      }
    );

    return {
      selectedKeys,
      onClick,
      locale,
      menuItems,
    };
  },
};
</script>

<style scoped>
#finance .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.ant-form{
  width: 20%;
  left: 40%;
}
</style>
