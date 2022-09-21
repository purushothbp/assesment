<template>
    <v-simple-table>
        <thead>
          <tr><th>Name
            <button @click="asc('/nameA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
            <button @click="desc('/nameD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
          </th>
          <th>customerId</th>
          <th>owner</th>
          <th>No.of branches</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{item.name}}</td>
            <td>{{item.customer_id}}</td>
            <td>{{item.owner}}</td>   
            <td>{{item.total}}</td>         
            <td >
              <v-btn @click="editItem(item)"> 
              <v-icon
              small>mdi-pencil
            </v-icon></v-btn>
            <v-btn @click="deleteItem(item.id)">
            <v-icon  small > 
              mdi-delete </v-icon></v-btn>
            </td>
          </tr>
        </tbody>
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Customer Details</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="black"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    POPUP
                  </v-btn>
                  <searched @searchTable="getData($event)"/>
                </template>
                <v-card>
                  <v-card-text>
                    <v-container>
                        <v-form
                        ref="form"
                          lazy-validation>
                          <v-text-field
                            v-model="formInput.customer_id"
                            :rules="[
                               v => !!v || 'Id is required',
                               v => (/^[0-9]+$/.test(v)) || 'Id must be valid',]"
                               label="Enter Id"
                         ></v-text-field>
                          <v-text-field
                            v-model="formInput.name"
                            label="Enter Hotel Name"
                            placeholder="enter name"
                            :rules="[
                              v => !!v || 'Name is required',
                              v => (v && v.length <= 15) || 'Name must be less than 15 characters',
                              v=>(/^[A-Za-z]+$/.test(v)) || 'Enter the valid name',
                            ]"
                          ></v-text-field>
                          <v-text-field
                            v-model="formInput.owner"
                            label="Enter Hotel owner"
                            placeholder="enter owner name"
                            :rules="[
                              v => !!v || 'owner name is required',
                              v => (v && v.length <= 20) || 'owner name must be less than 20 characters',
                              v=>(/^[A-Za-z]+$/.test(v)) || 'Enter the valid name',
                            ]"
                          ></v-text-field>
                        </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="Grey"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn v-if="fork" @click="insert"> submit </v-btn>
                    <v-btn v-else @click="save"> Save </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-simple-table>
  </template>

<script>
import axios from 'axios'
import  Vue from 'vue'
import searched from './search.vue'
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)
var band
  export default {
    data(){
      return{
        form: {},
        dialog: false,
        fork: true,
        list:undefined,
        dialogDelete: false,
        details: [],
        editedIndex: -1,
        index:"",
        formInput:{
        name: "",
        owner:"",
        customer_id:"",
        total:"",
      },
    }
  },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    async mounted() {
      Vue.axios.get(`http://127.0.0.1:3333/customers/join/`,this.formInput).then((res)=>{
            this.list=res.data
            console.log(res.data)
            })

    },
    methods: {
        async  insert(){
        await Vue.axios.post("http://127.0.0.1:3333/customers/insert",this.formInput).then((res)=>{
            console.log(res)          
          })
          this.dialog=false;
          this.$refs.form.reset();
        },
        async read(){
            await Vue.axios.get("http://127.0.0.1:3333/customers/select").then((res)=>{
            this.list=res.data;
            console.log(res.data);
            })
        },
        async deleteItem(id){
           await axios.delete(`http://127.0.0.1:3333/customers/delete/${id}`)
           this.read()
        },
        Changed(value) {
            console.log(value);
            this.list = value.data;
        },
        async save() {
            this.button = true;
            await axios.put(`http://127.0.0.1:3333/customers/update/${band.id}`,this.formInput)
                .then((res) => {
                console.warn((res));
            });
            this.dialog=false;
          this.$refs.form.reset();
        },
        editItem(item) {
            this.fork = false;
            this.dialog = true;
            band = item;
            this.formInput={name :item.name,owner : item.owner,
            }
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.dialog = false;
            this.$refs.form.reset();
        },
        async getData(value){
        console.log(value)
         let search1=await axios.post('http://127.0.0.1:3333/customers/search',{search:value})
        this.list=search1.data
  
      },
        async asc(val){
          await axios.get(`http://127.0.0.1:3333/customers${val}`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },
        async desc(val){
          await axios.get(`http://127.0.0.1:3333/customers${val}`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },
    },
    components:{searched}
    
}
  </script>
  