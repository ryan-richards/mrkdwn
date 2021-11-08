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
import { ref } from "vue";
import { supabase } from "../supabase";
import { store } from "../store";
import getTitle from 'get-title-markdown'

export default {
  setup() {
    const loading = ref(false);
    const postValue = ref("");
    const title = ref("");

    const success = ref(false);
      
    async function postItem() {
      title.value = getTitle(postValue.value)
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .insert([
            {
              body: postValue.value,
              user: store.user.id,
              title: title.value
            },
          ]);
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
        success.value = true;
        postValue.value = "";
        successfulPost()
      }
    }

    function successfulPost(){
      setTimeout(() => {
        success.value = false;
      }, 3000);
    }

    return {
      loading,
      postValue,
      title,
      postItem,
      success,
      successfulPost,
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
	text-align:center;
}

.post2{
	position:fixed;
	bottom:40px;
	right:120px;
	text-align:center;
}


</style>