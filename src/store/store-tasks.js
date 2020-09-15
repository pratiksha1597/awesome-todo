import Vue from 'vue'
import { uid , Notify } from 'quasar'
import { firebaseDb, firebaseAuth} from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {

    tasks: {
    //    'id1': {
         
    //       name: 'Go to shop',
    //       completed: false,
    //       dueDate:'2020/05/11',
    //       dueTime:'18:30'
    //     },
    //      'id2':{
          
    //       name: 'Get bananas',
    //       completed: false,
    //        dueDate: '2020/04/12',
    //       dueTime: '18:30'
    //     },
    //     'id3': {
          
    //       name: 'Get apples',
    //       completed: false,
    //        dueDate: '2020/06/10',
    //       dueTime: '18:30'
    //     }
    },
    search: '',
    sort :'name',
    taskDownloaded : false

}

const mutations = {
     updateTask(state,payload){
        console.log('payload (from mutation):', payload);
        Object.assign(state.tasks[payload.id] , payload.updates)
     },
     deleteTask(state, id){
        // console.log(' delete id: ',id)
        // delete state.tasks[id]
        Vue.delete(state.tasks, id)
    },
    addTask(state ,payload){
        Vue.set(state.tasks , payload.id, payload.task)
    },

    clearTasks(state){
        state.tasks = {}
    },
    setSearch( state, value){
        state.search = value
    },
    setSort( state, value){
        state.sort = value
    },
    setTasksDownloaded( state, value){
        state.taskDownloaded = value
    }
}

const actions = {
 updateTask({ dispatch },payload) {
//     //debugger
dispatch('fbUpdateTask', payload)

},

deleteTask({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
},

addTask({ dispatch }, task){
 let taskId =uid()
 let payload ={
     id:taskId,
     task: task
 }
 dispatch('fbAddTask', payload)
},

setSearch({ commit }, value){
    commit('setSearch',value)
},
setSort({ commit }, value){
    commit('setSort',value)
},

 fbReadData({ commit }) {
    //console.log('start reading data from Firebase')
    let userId = firebaseAuth.currentUser.uid
      //console.log(userId)
    let userTasks = firebaseDb.ref('tasks/' + userId)
    //console.log(userTasks)

    /////////////////initial check for data
    userTasks.once('value',snapshop => {
        commit('setTasksDownloaded', true), error =>{
            showErrorMessage(error.message)
            this.$router.replace('/auth')
        }
    })

    /////////////////child added
    userTasks.on('child_added', snapshot => {
    let task = snapshot.val()
    let key = snapshot.key
     let payload = {
        id: key,
        task: task 
    }
    //console.log(payload)
    commit('addTask', payload)
    })

    ////////////////////////////child changed
    userTasks.on('child_changed', snapshot => {
        let task = snapshot.val()
        let key = snapshot.key
         let payload = {
            id: key,
            updates: task 
        }
        //console.log(payload)
        commit('updateTask', payload)
        })
    /////////////////////////// child remove
    userTasks.on('child_removed', snapshot => {
        let taskId = snapshot.key
        commit('deleteTask', taskId)
        })
    },
    //////////////////// Add new Task
    fbAddTask({} , payload){
        //console.log('fbAddTask payload', payload)
        let userId = firebaseAuth.currentUser.uid
        let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
        taskRef.set(payload.task ,error =>{
            if(error){
                showErrorMessage(error.message)
            }
            else{
                Notify.create('Task Added')
            }
        })
    } ,      
    //////////////////////// Update Task
    fbUpdateTask({} , payload){
        //console.log('fbAddTask payload', payload)
        let userId = firebaseAuth.currentUser.uid
        let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
        taskRef.update(payload.updates,error =>{
            if(error){
                showErrorMessage(error.message)
            }
            else{
                 let keys = Object.keys(payload.updates)
                  console.log('keys',keys)
                if(!(keys.includes('completed') && keys.length == 1)){
                     Notify.create('Task Updated')
                }
            }
        })
    }  ,
    ///////////////////////Delete Task 
    fbDeleteTask({} , taskId){
        //console.log('fbAddTask payload', payload)
        let userId = firebaseAuth.currentUser.uid
        let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
        taskRef.remove(error =>{
            if(error){
                showErrorMessage(error.message)
            }
            else{
                Notify.create('Task Deleted')
            }
        })
    } 

}

const getters = {

        // task Sored list
    tasksSorted: (state , getters) =>{
       let tasksSorted ={},
            keysOrdered = Object.keys(state.tasks)
        keysOrdered.sort((a,b) =>{
            let taskAProp = state.tasks[a][state.sort].toLowerCase(),
                taskBProp = state.tasks[b][state.sort].toLowerCase()
            if (taskAProp > taskBProp) return 1
            else if(taskAProp < taskBProp) return -1
            else return 0
        })

        keysOrdered.forEach((key) => {
            tasksSorted[key] = state.tasks[key]
        })
        //console.log('tasksSorted:' , tasksSorted);
       return tasksSorted

    },



// -----------------------For search Tools------------
    tasksFiltered: (state , getters) => {
        let tasksSorted = getters.tasksSorted,
            tasksFiltered = {}
        if (state.search) {
            Object.keys(tasksSorted).forEach(function(key) {
                let task =tasksSorted[key],
                taskNameLowerCase = task.name.toLowerCase(),
                searchLowerCase = state.search.toLowerCase()
                if(taskNameLowerCase.includes(searchLowerCase)){
                    tasksFiltered[key]= task
                }
            })
        return tasksFiltered
    }
    return tasksSorted
   
},
   
   


    tasksTodo: (state ,getters) => {
        let tasksFiltered =getters.tasksFiltered
        let tasks = {}
      // console.log( Object.keys(state.tasks))
        Object.keys(tasksFiltered).forEach(function(key) {
            let task = tasksFiltered[key]
           // console.log('task: ',task);
           if(!task.completed){
               tasks[key] = task
           }

        })
        return tasks
    },

    tasksCompleted: (state , getters) => {
        let tasksFiltered =getters.tasksFiltered
        let tasks = {}
       //console.log( Object.keys(state.tasks))
        Object.keys(tasksFiltered).forEach(function(key) {
            let task = tasksFiltered[key]
           // console.log('task: ',task);
           if(task.completed){
               tasks[key] = task
           }

        })
        return tasks
    },

}


export default {
    namespaced :true,
     state,
     mutations,
     actions,
     getters
}