<template>
<n-space>
<n-button class="post" @click="postItem">Publish</n-button>
<n-button class="post2" >Save Draft</n-button>
<div style="min-width:500px;">
<n-input v-model:value="postValue" type="textarea" style="min-width:10vh;max-width:100vh;margin-top:4rem;padding:1rem;text-align:left;" :autosize="{
        minRows: 10
      }
      "></n-input>
</div>
</n-space>

</template>

<script>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";
import { store } from "../store";
import getTitle from 'get-title-markdown'
import { useRoute } from "vue-router";

export default {
  setup() {
    const loading = ref(false);
    const postValue = ref("");
    const title = ref("");
    const route = useRoute();
    const success = ref(false);
      
    async function postItem() {
      title.value = getTitle(postValue.value)
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .update([
            {
              body: postValue.value,
              title: title.value
            },
          ])
           .eq('user', store.user.id)
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
        success.value = true;
        successfulPost()
      }
    }

    async function getPost() {
      try {
      const { data, error, status } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('user' , store.user.id)
      .eq('id', route.params.id)
      .single()
      if (error && status !== 406) throw error;
        if (data) {
          console.log(data)
          postValue.value = data.body
        }
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("Post collected")
      }
    }

    function successfulPost(){
      setTimeout(() => {
        success.value = false;
      }, 3000);
    }

    onMounted(() => {
      getPost();
    });

    return {
      loading,
      postValue,
      title,
      postItem,
      success,
      successfulPost,
      route
    };
  },
};
</script>

<style scoped>
.n-input{
  background-color:transparent ;
  color: aliceblue;
  font-size: 26px;
  padding:1rem;
  border: none;
  box-shadow: none;
}

.post{
	position:fixed;
	bottom:40px;
	right:40px;
	background-color:rgb(197, 197, 197);
	color:#FFF;
	text-align:center;
}

.post2{
	position:fixed;
	bottom:40px;
	right:120px;
	background-color:rgb(150, 150, 150);
	color:#FFF;
	text-align:center;
}


</style>