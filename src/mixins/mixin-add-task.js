export default{
    methods : {
        
       submitForm() {
          // console.log('submitForm');
          debugger
           this.$refs.modalTaskName.$refs.name.validate()
           if(!this.$refs.modalTaskName.$refs.name.hasError) {
               this.submitTask()
           }
       },
       clearDueDate(){
           debugger
           this.taskToSubmit.dueDate = ''
           this.taskToSubmit.dueTime = ''
       }
    }
}