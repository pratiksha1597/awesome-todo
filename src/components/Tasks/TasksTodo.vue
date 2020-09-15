<template>
<transition
  appear
  enter-active-class="animated ZoomIn"
  leave-active-class="animated ZoomOut absolute-top"
>
<div>
     <Listheader v-if="!settings.showTasksInOneList" class="bg-orange-4"> Task Todo</Listheader>


    <q-list   separator bordered >
     
      <task  v-for="(task ,key) in tasksTodo" :key="key" :task="task"
              :id="key"></task>
    </q-list>
</div>
</transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props:['tasksTodo'],
    computed:{
      ...mapGetters('settings', ['settings'])
    },
    components: {
       'task': require('components/Tasks/Task.vue').
          default,
          'Listheader': require('components/Tasks/Sheared/Listheader.vue').
          default,
   
    }
    
}
</script>