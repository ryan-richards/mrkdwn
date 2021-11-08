<template>
      <n-space align="left" justify="space-between">
        <n-h2 align="left">
          <router-link to="/feed">mrkdwn</router-link>
        </n-h2>
        <n-menu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          :on-update:value="signOut"
          v-if="!(isMobile || isTablet)"
        />

        <n-dropdown
          v-model:value="activeKey"
          :on-select="signOut"
          v-if="isMobile || isTablet"
          trigger="click"
          :options="menuOptions"
          :show-arrow="true"
          placement="bottom-end"
        >
          <n-button>
            <template #icon>
              <n-icon>
                <menu-outline />
              </n-icon>
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
</template>

<script>
import { defineComponent, h, ref} from "vue";
import { NIcon } from "naive-ui";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { RouterLink } from "vue-router";
import {
  MenuOutline,
  PersonOutline as UserIcon,
  AddCircleOutline as AddIcon,
  ListOutline as ListIcon,
  SettingsOutline as SettingsIcon,
  LogOutOutline as LogOutIcon
} from "@vicons/ionicons5";
import { useIsMobile, useIsTablet } from "../utils/composables";

export default defineComponent({
  components: {
    MenuOutline,
  },
  setup() {


    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
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
      {
        label: "Log Out",
        key: "signOut",
        icon: renderIcon(LogOutIcon),
        value: console.log("clicked"),
      },
    ];

    const isMobileRef = useIsMobile();
    const isTabletRef = useIsTablet();

    const router = useRouter();

    const signOut = async (key) => {
      if (key === "signOut") {
        try {
          let { error } = await supabase.auth.signOut();
          if (error) throw error;
        } catch (error) {
        } finally {
          router.push("/login");
        }
      }
    };

    return {
      overlap: ref(false),
      activeKey: ref(null),
      isMobile: isMobileRef,
      isTablet: isTabletRef,
      menuOptions,
      signOut,
    };
  },
});
</script>


<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgb(16, 16, 20);
  padding: 24px;
}

a {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
</style>
