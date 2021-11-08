<template>
    <n-layout style="min-height:100vh;">
        <n-layout-header style="height: 64px; padding:1rem;" bordered v-if="isMobileRef">
         <Navbar />
        </n-layout-header>
        <n-layout has-sider position="absolute" :class="{top : isMobileRef}">
            <n-layout-sider
              bordered
              show-trigger
              collapse-mode="width"
              :collapsed-width="84"
              :width="200"
              :native-scrollbar="false"
              style="max-height: 100vh;"
              :on-update:collapsed="collapse"
              position="static"
              v-if="!isMobileRef||isTabletRef"
            >
            <n-h1 v-if="!collapsed" style="padding-top:1rem;">mrkdwn.</n-h1>
            <n-h1 v-else style="padding-top:1rem;">md.</n-h1>
              <n-menu
                :collapsed-width="84"
                :collapsed-icon-size="22"
                :options="menuOptions"
              />
            </n-layout-sider>
            <n-layout>       
                  <n-space justify="center"> 
                      <router-view></router-view>
                  </n-space>
            </n-layout>
      </n-layout>
    </n-layout>
</template>

<script>
import { NIcon } from 'naive-ui'
import { ref, defineComponent, h, watch } from "vue";
import { RouterLink } from "vue-router";
import Navbar from './Navbar.vue'
import { useIsMobile, useIsTablet } from '../utils/composables'
import { MailOutline as MailIcon,
PersonOutline as UserIcon,
AddCircleOutline as AddIcon,
ListOutline as ListIcon,
SettingsOutline as SettingsIcon,
PersonOutline as PersonIcon,
} from "@vicons/ionicons5";

export default defineComponent({
    components: {
    MailIcon,
    AddIcon,
    ListIcon,  
    SettingsIcon,
    PersonIcon,
    Navbar
  },
  setup() {
    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()
    const collapsed = ref(false);

  function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  function collapse(){
    collapsed.value = !collapsed.value;
  }

const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "Profile",
              },
            },
            { default: () => "Profile" }
          ),
        key: "go-back-home",
        icon: renderIcon(UserIcon),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "post",
              },
            },
            { default: () => "Add Post" }
          ),
        key: "Post",
        icon: renderIcon(AddIcon),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "posts",
              },
            },
            { default: () => "Blog Posts" }
          ),
        key: "Posts",
        icon: renderIcon(ListIcon),
      },
            {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "settings",
              },
            },
            { default: () => "Settings" }
          ),
        key: "settings",
        icon: renderIcon(SettingsIcon),
      },
    ];

    return {
      isMobileRef,
      isTabletRef,
      inverted: ref(false),
      menuOptions,
      collapsed,
      collapse,
      top
    };
  },
});
</script>

<style>
a{
  color: whitesmoke;
}

.top{
  margin-top:64px;
}
</style>
