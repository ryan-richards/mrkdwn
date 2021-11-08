import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from "../supabase"
import Login from '../views/Login.vue'
import Profile from '../views/ProfilePanel.vue'
import Post from '../views/Post.vue'
import Posts from '../views/Posts.vue'
import Settings from '../views/Settings.vue'

const routes = [
    {
        path: '/',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        
    },
    {
        path: '/post',
        name: 'post',
        component: Post,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/posts',
        name: 'posts',
        component: Posts,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            requiresAuth: true
        }
    },
    { path: '/:username', 
      component: () => import("../views/User.vue"),
      meta: {
        requiresAuth: true
    }, 
  },
  { path: '/edit/:id', 
  component: () => import("../views/EditPost.vue"),
  meta: {
    requiresAuth: true
    }
  }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const currentUser = supabase.auth.user();
    const requiresAuth = to.matched.some
    (record => record.meta.requiresAuth);
    if(requiresAuth && !currentUser) next('login');
    else if(!requiresAuth && currentUser) next("/");
    else next();
  })


export default router