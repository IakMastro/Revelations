import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },

  { path: '/:patchMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const public_pages = ['/']
  const auth_required = !public_pages.includes(to.path)
  const logged_in = localStorage.getItem('user')

  if (auth_required && !logged_in) {
    next('/')
  }

  next()
})

export default router
