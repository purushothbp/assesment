<template>
    <div>
        <input type="text" v-model="val" placeholder="search" v-on:keyup="search(val)">
    </div>
</template>


<script>
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'search',
    input:'',
    props:{
        link:String
    },
    data:()=>{
        return {
            input:'',
        }
    },
    methods:{
        search(){
                 if(this.val.length!=0){
                  Vue.axios.post('http://127.0.0.1:3333/customers/search',console.log({search:this.val}))
                  .then((res)=>{
                  this.$emit('searchTable',res)
                  })
                }
        }
    }
}
</script>
