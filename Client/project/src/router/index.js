import { createRouter, createWebHistory } from 'vue-router';
import signin from '../components/signin.vue'
import accueil from '../components/accueil.vue'
import donneur from '../components/donneur.vue'
import demandeur from '../components/demandeur.vue'
import signup from '../components/signup.vue'
import donorDashboard from '../components/donorDashboard.vue'
const routes = [
    {
      path: '/signin',
      name: 'signin',
      component: signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/donorDashboard',
      name: 'donorDashboard',
      component: donorDashboard,
    },
    {
        path: '/',
        name: 'accueil',
        component: accueil,
      },
      {
        path: '/donneur',
        name: 'donneur',
        component: donneur,
      },
      {
        path: '/demandeur',
        name: 'demandeur',
        component: demandeur,
      },

]

// Créer l'instance du routeur
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Utiliser import.meta.env.BASE_URL pour l'URL de base dynamique
    routes, // Passer le tableau des routes
  });
  
  // Exporter l'instance du routeur
  export default router;