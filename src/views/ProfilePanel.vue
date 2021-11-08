<template>
  <n-space vertical
    justify="center"
    style="margin-top:2rem;margin-left:2rem;">
  <n-space
    vertical
    justify="center"
    style="max-width: 300px; margin-left: auto; margin-right: auto"
  >
    <n-h2
      >Your website is live at
      <a :href="'https://www.mrkdwn.dev/' + username"
        >mrkdwn.dev/{{ username }}</a
      ></n-h2
    >
  </n-space>

  
  <n-space justify="center" style="margin:1rem;padding:1rem;max-width:900px;">
  <n-grid cols="1 s:1 m:2" responsive="screen" :x-gap="8" :y-gap="8">
    <n-grid-item>
    <n-card title="Card Slots Demo" style="max-width:350px;min-width:250px;text-align:left">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quaerat ullam quas dolorem facere adipisci iste expedita esse ipsam saepe?
    <template #footer> 
            <div style="display: flex; justify-content: flex-end;">
          <n-button>
            Validate
          </n-button>
        </div>  
    </template>
  </n-card>
    </n-grid-item>
    <n-grid-item>
    <n-card title="Card Slots Demo" style="max-width:350px;min-width:250px;text-align:left">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quaerat ullam quas dolorem facere adipisci iste expedita esse ipsam saepe?
    <template #footer> 
            <div style="display: flex; justify-content: flex-end;">
          <n-button>
            Validate
          </n-button>
        </div>  
    </template>
  </n-card>
    </n-grid-item>
    <n-grid-item>
    <n-card title="Card Slots Demo" style="max-width:350px;min-width:250px;text-align:left">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quaerat ullam quas dolorem facere adipisci iste expedita esse ipsam saepe?
    <template #footer> 
            <div style="display: flex; justify-content: flex-end;">
          <n-button>
            Validate
          </n-button>
        </div>  
    </template>
  </n-card>
    </n-grid-item>
  </n-grid>
  </n-space>
  </n-space>

  


</template>

<script>
import { store } from "../store";
import { supabase } from "../supabase";
import { onMounted, ref, defineComponent} from "vue";
import { useRouter } from "vue-router";
import { useIsMobile, useIsTablet } from '../utils/composables'
import { MailOutline as MailIcon,
CheckmarkCircleOutline as CheckIcon,
RadioButtonOffOutline as EmptyIcon,
} from "@vicons/ionicons5";

export default defineComponent({
    components: {
    MailIcon,
    CheckIcon,
    EmptyIcon,
  },
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const email = ref("");
    const username = ref("");

    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()

    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
    });
    
    email.value = store.user.email;

    async function getProfile() {
      try {
        store.user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`*`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;
        if (data) {
          console.log("getting profile")
          username.value = data.username;
        }
      } catch (error) {
        alert(error.message);
      } finally {
      }
    }


    onMounted(() => {
      getProfile();
    });



    return {
      email,
      store,
      loading,
      username,
      isMobile: isMobileRef,
      isTablet: isTabletRef,
    };
  },
});
</script>
