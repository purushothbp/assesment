<template>
    <div>
        <v-text-field v-model="input" placeholder="search" v-on:keyup="search">Search</v-text-field>
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
    },
    data:()=>{
        return {
            input:'',
        }
    },
    methods:{
        search(){
            this.$emit('searchTable',this.input)
        }
    }
}
</script>
