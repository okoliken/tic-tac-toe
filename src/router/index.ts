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
          path: '',  
          component: GameMenu
        },
        {
          path: 'game',
          component: () => import('../views/GameArea.vue')
        } 
      ]
    }
  ]
})

export default router
