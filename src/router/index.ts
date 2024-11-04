import { createRouter, createWebHistory } from 'vue-router'
import CenteredLayout from '../layouts/CenteredLayout.vue'
import GameMenu from '../views/GameMenu.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: CenteredLayout,
      children: [
        {
          path: '',  // default child route (home)
          component: GameMenu
        },
      ]
    }
  ]
})

export default router
