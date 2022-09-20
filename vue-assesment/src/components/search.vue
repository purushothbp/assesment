<template>
    <div>
        <input type="text" v-model="val" placeholder="search" @keyup="search(val)">
    </div>
</template>


<script>
import Vue from 'vue';


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
                  Vue.axios.post('http://127.0.0.1:3333/customer/search',{search:this.val})
                  .then((res)=>{
                  this.$emit('searchTable',res)
                  })
                }
        }
    }
}
</script>
