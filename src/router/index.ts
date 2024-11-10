import { createRouter, createWebHistory } from 'vue-router'
import CenteredLayout from '../layouts/CenteredLayout.vue'
import GameMenu from '../views/GameMenu.vue'
import Nprogress from "nprogress";

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

router.beforeEach(() => {
  Nprogress.start();
})

router.afterEach(() => {
  Nprogress.done();
})

export default router
