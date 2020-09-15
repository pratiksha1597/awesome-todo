
<template>

   <div class="row q-mb-sm">
    <q-input 
    outlined 
    :value="name" 
    @input="$emit('update:name',$event)"
     
    label="Task Name" 
    ref="name"  
    class="col" 
    autofocus 
    v-select-all
    :rules="[val => !!val || 'Field is required']">
      <template v-slot:append>
          <q-icon name="close" 
          v-if="name" 
          @click="$emit('update:name', '')"
          class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          Field hint
        </template>
                 </q-input>     
        
        </div>
    
</template>
<script>
import {selectAll} from 'src/directives/directives-select-all'
export default {
    props:['name'],
    directives: {
        selectAll
    }
    
}
</script>