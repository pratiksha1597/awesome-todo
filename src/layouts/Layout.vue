<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/>

        <q-toolbar-title>
          Awesome Todo
        </q-toolbar-title>

        <q-btn 
        v-if= "!loggedIn" 
        flat  
        to="/auth" 
        icon-right="account_circle " 
        label="Login" />

         <q-btn 
        v-else
        @click="logoutUser"
        flat  
        icon-right="account_circle " 
        label="Logout" />
        
      </q-toolbar>
    </q-header>

<!---------------------------- Footer -->
 <q-footer> 
   <q-tabs>
        <q-route-tab  v-for="nav in navs" :key="nav.id" :to="nav.to"  :icon="nav.icon" :label="nav.label"  />
        <!-- <q-route-tab  icon="settings" label="Settings" to="/settings" />
           -->  </q-tabs> 
</q-footer>

 <!-- Navigation bar  -->
    <q-drawer
      v-model="leftDrawerOpen"
       :breakpoint="767"
      bordered
      content-class="bg-blue-8"
      
    >

   
      <q-list>
        <q-item-label header class="text-grey-10" > Navigations </q-item-label>
        <!-- <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
      -->
     <q-item v-for="nav in navs" :key="nav.id" :to="nav.to"  exact clickable>
      <q-item-section avatar>
        <q-icon :name="nav.icon"/>
        </q-item-section> 
        <q-item-section>
          <q-item-label>{{nav.label}}</q-item-label>
        </q-item-section>
     </q-item>





      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { mapState , mapActions } from 'vuex'



export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
     // essentialLinks: linksData
    // tab:false,
    navs:[{
      id:1,
      label:'Todo',
      icon:'list',
      to:'/'
    },
    {
      id:2,
      label:'Settings',
      icon:'settings',
      to:'/settings'
    },
   
    ]
    }
  },
  computed: {
    ...mapState('auth' , ['loggedIn'])
  },
  methods: {
    ...mapActions('auth' , ['logoutUser']),
  }
}
</script>
<style lang="scss">
@media screen and (min-width: 768px){
  .q-footer{
    display: none;
  }
};
.q-drawer {.q-router-link--exact-active{
  color: white ! important;
}
background-color:rgb(4, 4, 78);
}

</style>
