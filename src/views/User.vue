<template>
<div style="padding-bottom:2rem;">
  <n-h1>{{ user.username }}</n-h1>
</div>


<n-space justify="center" v-for="post in postList" :key="post.id">
  <n-card @click="messageUser" hoverable>
    <n-space justify="space-between">
    <n-p>{{post.post}}</n-p>
    </n-space>
  </n-card>
</n-space>
</template>


<style>

.n-card{
min-width: 300px;
margin-left: auto;
margin-right: auto;
}

</style>


<script>
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { store } from "../store";

export default {
  setup() {
    const route = useRoute();
    const user = ref("");
    const postList = ref([]);
    const loading = ref(true);
    store.user = supabase.auth.user();

    console.log(store.user.id)
    console.log(user.value)

    async function getUser() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", route.params.username)
        .single();
      if (error) {
        console.error(error);
      } else {
        user.value = data;
        getMarkdown();
      }
    }

    async function getMarkdown() {
      try {
        loading.value = true;
        console.log("fetching posts");
        let { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("userID", user.value.id);
        console.log(data);
        if (data) {
          postList.value = data;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }
   
    onMounted(() => {
      getUser();
    })

    return {
      getUser,
      getMarkdown,
      user,
      postList,
      store
    };
  },
};
</script>