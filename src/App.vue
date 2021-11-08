<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
   <n-global-style />
    <Dashboard />
  </n-config-provider>
</template>

<script>
import { store } from "./store"
import { supabase } from "./supabase"
import { darkTheme } from 'naive-ui'
import Dashboard from './components/Dashboard.vue'
import { NConfigProvider } from 'naive-ui'






export default {
  components:{
    Dashboard,
    NConfigProvider
  },
  setup() {

 /**
   * @type import('naive-ui').GlobalThemeOverrides
   */

  const themeOverrides = {
    common:{
      primaryColor:'#6EA1DB',
      primaryColorHover:'#6EA1DB',
      primaryColorPressed:'#6EA1DB'
    },
    Button: {
      textColor: '#FFFFFF'
    },
    Input: {
      boxShadowFocus: '#FF0000',
      colorFocus: '#2c3e5000',
      borderFocus: '#2c3e5000',
      caretColor: '#FFFFFF'

    }

  }


    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
    store.user = session.user;
    });

    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        alert("Logged out");
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

    return {
      store,
      handleLogout,
      darkTheme,
      themeOverrides
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e5000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
