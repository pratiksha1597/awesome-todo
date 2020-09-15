<template>
<transition
  appear
  enter-active-class="animated ZoomIn"
  leave-active-class="animated ZoomOut"
>
<div 
    :class="{ 'q-mt-lg' : !settings.showTasksInOneList }"
>
    <Listheader  v-if="!settings.showTasksInOneList" class="bg-green-4"> Tasks Completed</Listheader>
   <q-list  separator bordered >
     
      <task  v-for="(task ,key) in tasksCompleted" :key="key" :task="task"
              :id="key"></task>

      
    </q-list>
</div>
</transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props:['tasksCompleted'],
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