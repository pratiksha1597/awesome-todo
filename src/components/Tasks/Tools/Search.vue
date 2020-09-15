<template>

     
  <q-input outlined  
  v-model="searchField"
  @keyup.esc =" searchField = ''"
  v-select-all
  
  label="Search" class="col">
        

        <template v-slot:append>
          <q-icon  name="close"
          v-if="searchField !== ''"
           @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

       
  </q-input>
    
</template>
<script>
import { mapState , mapActions } from 'vuex'
import {selectAll} from 'src/directives/directives-select-all'
export default {
  
    computed: {
        ...mapState('tasks', ['search'] ),
        searchField : {
           get(){
                return this.search
           },
           set(value){
               this.setSearch(value)
               console.log('value: ' , value);
           }
        }
    },
    methods:{
        ...mapActions('tasks',['setSearch'])
    },
    directives: {
        selectAll
    }
}
</script>