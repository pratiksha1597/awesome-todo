<template>
  <q-page padding>
    <button style="position:absolute; right:10px" @click="counter++">{{counter}}</button>
    <input v-model="message" @keyup.enter="alertMessage" v-autofocus/>
    <!--
      //clear inputbox without methods
       <button @click="message=''">clear</button> -->
     <button @click='clearMessage'>clear</button>
    <h5>{{ message }}</h5>
    <p>Lowercase message : {{ message |messageLowercase}}</p>
    
  </q-page>
</template>

<script>
export default {
    data(){
      return{
        message:"I love vue.js",
        counter:0
      }
    },
    methods:{
      // clear inputbox
          clearMessage(){
            this.message = ''
          },
         
          alertMessage(){
            alert(this.message)
          }
    },
    filters:{
        messageLowercase(value){
          return value.toLowerCase()
        }
    },
    directives : {
      autofocus:{
        inserted(el){
            el.focus()
        }
      }
    }
    
}
</script>
