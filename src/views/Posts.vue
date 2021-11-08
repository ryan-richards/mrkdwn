<template>
<n-space vertical style="padding-top:4rem;padding-left:1rem;padding-right:1rem;min-width:550px;">
    <n-tabs type="line">
      <n-tab-pane name="live" tab="Published">
  <n-card v-for="post in published" :key="post.id" :title="post.title" style="max-width:550px;min-width:550px;text-align:left;margin-top:1rem;">
    <div v-html="mrkdwn(post.body)">
    </div>
    <template #footer> 
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="edit(post.id)" style="margin-right:0.2rem;">
            Edit
          </n-button>
           <n-button>
            Preview
          </n-button>
        </div>  
    </template>
  </n-card>
      </n-tab-pane>
            <n-card v-for="post in published" :key="post.id" :title="post.title" style="max-width:550px;min-width:550px;text-align:left;margin-top:1rem;">
    <div v-html="mrkdwn(post.body)">
    </div>
    <template #footer> 
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="edit(post.id)" style="margin-right:0.2rem;">
            Edit
          </n-button>
           <n-button>
            Preview
          </n-button>
        </div>  
    </template>
  </n-card>

      <n-tab-pane name="drafts" tab="Drafts">
        <n-card v-for="post in drafts" :key="post.id" :title="post.title" style="max-width:550px;min-width:550px;text-align:left;margin-top:1rem;">
    <div v-html="mrkdwn(post.body)">
    </div>
    <template #footer> 
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="edit(post.id)" style="margin-right:0.2rem;">
            Edit
          </n-button>
           <n-button>
            Preview
          </n-button>
        </div>  
    </template>
  </n-card>
      
      </n-tab-pane>
    </n-tabs>

</n-space>

</template>

<script>
import { onMounted, ref, computed} from "vue";
import { supabase } from "../supabase";
import { store } from "../store";
import  { useRouter }  from 'vue-router'
import  { marked } from 'marked'

export default {
  setup() {
    const loading = ref(false);
    const postList = ref([]);
    const success = ref(false);
    const router = useRouter();



    function mrkdwn(body){
      return marked(body.slice(0,200) + " ...")
    }

    async function getPosts() {
      try {
      const { data, error, status } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('user' , store.user.id)
      if (error && status !== 406) throw error;
        if (data) {
          console.log(data)
          postList.value = data
        }
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("Posts collected")
      }
    }

    const published = computed(() => {
      return postList.value.filter((post) => {
        return (
          post.published == true
        );
    });
    });

    const drafts = computed(() => {
      return postList.value.filter((post) => {
        return (
          post.published == false
        );
    });
    });

    function successfulPost(){
      setTimeout(() => {
        success.value = false;
      }, 3000);
    }

    function edit(id){
      router.push("/edit/"+ id)
    }

     onMounted(() => {
      getPosts();
    });

    return {
      loading,
      postList,
      getPosts,
      success,
      successfulPost,
      edit,
      mrkdwn,
      published,
      drafts
    };
  },
};
</script>