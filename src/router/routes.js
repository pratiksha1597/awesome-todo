
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/pageTodo.vue') },
      { path: '/settings', component: () => import('pages/pageSettings.vue') },
      { path: '/about', component: () => import('pages/pageAbout.vue') },
      { path: '/auth', component: () => import('pages/pageAuth.vue') },
      { path: '/settings/help', 
       component: () => import('pages/pageHelp.vue') },
      
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  
]

export default routes
