<template>
  <q-card>
   
   <ModalHeader>Edit Task</ModalHeader>
    
    <form @submit.prevent="submitForm">
    <q-card-section >
     
     <ModalTaskName 
     :name.sync="taskToSubmit.name" 
     ref="modalTaskName"
     ></ModalTaskName>
        <!-- ----------------------for Date Picker -->
       <ModalDueDate :dueDate.sync="taskToSubmit.dueDate"
        @clear="clearDueDate" >
       </ModalDueDate>
   
        <!-- ----------------------for time Picker -->
        <ModalTime 
        v-if="taskToSubmit.dueDate"
        :dueTime.sync="taskToSubmit.dueTime" ></ModalTime>
       
    </q-card-section>
     <!-----------Button---------->

            <ModalButtons ></ModalButtons>
        
    
    </form>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex'

import ModalHeader from 'components/Tasks/Modals/Shared/ModalHeader'
import ModalTaskName from 'components/Tasks/Modals/Shared/ModalTaskName'
import ModalDueDate from 'components/Tasks/Modals/Shared/ModalDueDate'
import ModalTime from 'components/Tasks/Modals/Shared/ModalDueTime'
import ModalButtons from 'components/Tasks/Modals/Shared/modalButtons'
export default {
    props:['task','id'],
    data(){
        return {
            taskToSubmit : {
                 name: '',
                 dueDate:'',
                 dueTime:'',
                 completed: false,
            }
        }
    },
    methods:{
         ...mapActions('tasks' , ['updateTask']),
        submitForm() {
           // console.log('submitForm');
           debugger
            this.$refs.modalTaskName.$refs.name.validate()
            if(!this.$refs.modalTaskName.$refs.name.hasError) {
                this.submitTask()
            }
        },
        submitTask() {
            debugger
            //console.log('submitTask');
            this.updateTask( {
            id: this.id,
            updates : this.taskToSubmit
            })
            this.$emit('close')
        },
        clearDueDate(){
            debugger
            this.taskToSubmit.dueDate = ''
            this.taskToSubmit.dueTime = ''
        }
    },
    components: {
    //     'modal-header':require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
    //      'modal-task-name':require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
    //      'modal-task-dueDate':require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
    // 
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalTime,
    ModalButtons
    },
    mounted(){
       this.taskToSubmit = Object.assign({}, this.task)
    }
};
</script>
<style scoped>
</style>