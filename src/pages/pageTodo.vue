
   <template>
   <q-page >
     <div class="q-pa-md absolute full-width full-height column">

       <template v-if="taskDownloaded">
        <div class="row q-mb-lg">
       <Search></Search><sort/>
     </div>
     
    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length ">No Search Results</p>     

     <q-scroll-area class="q-scroll-area-tasks">
     <NoTasks
     v-if="!Object.keys(tasksTodo).length && !search &&  !settings.showTasksInOneList"
     
     ></NoTasks>
  <!-- incomplete Task -->
    <TasksTodo
    v-if="Object.keys(tasksTodo).length"
    :tasksTodo="tasksTodo"/>
<!-- ----------------Completed Task -->

 <tasksCompleted   v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" class="q-mb-xl"/>
     </q-scroll-area>
    
    <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
    <q-btn
    @click="showAddTask = true"
     round
     class="all-pointer-events"
     color="primary"
     size="24px"
     icon="add">
     </q-btn>
     </div>

       </template>
       <template v-else>
       <span class="absolute-center">  <q-spinner color="primary" size="3em"/></span>
       </template>
</div>
    
     <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>

   </q-page>
</template>


<script>
import { mapGetters , mapState} from 'vuex'
import TasksTodo from 'components/Tasks/TasksTodo.vue'
import TasksCompleted from 'components/Tasks/TasksCompleted.vue'
import NoTasks from 'components/Tasks/NoTasks.vue'
import Search from 'components/Tasks/Tools/Search.vue'
import sort from 'components/Tasks/Tools/Sortlist.vue'
export default {
  data(){
    return{
      showAddTask : false
    }
  },
   computed : {
    ...mapGetters('tasks',['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settings',['settings']),
    ...mapState('tasks', ['search','taskDownloaded'])
   },
   mounted(){
     this.$root.$on('showAddTask',() => {
       this.showAddTask =true
     })
   },
   components:{
     'task': require('components/Tasks/Task.vue').
          default,
     'add-task': require('components/Tasks/Modals/AddTask.vue').
          default,
          TasksTodo,
          TasksCompleted,
          NoTasks,
          Search,
          sort
   }
   
    
}
</script>
<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1  ;
}
</style>