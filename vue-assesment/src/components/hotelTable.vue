<template>
    <v-simple-table>
        <thead>
          <tr><th>Name
            <button @click="asc('/nameA')"><v-icon x-small>mdi-arrow-up</v-icon></button>
            <button @click="desc('/nameD')"><v-icon x-small>mdi-arrow-down</v-icon></button>
          </th>
          <th>Address</th>
          <th>pincode</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{item.name}}</td>
            <td>{{`${item.no},${item.street},${item.landmark},${item.area}`}}</td>
            <td>{{item.pincode}}</td>          
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
              <v-toolbar-title>Hotel Details</v-toolbar-title>
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
                            v-model="formInput.no"
                            :rules="[
                               v => !!v || 'Door no  is required',
                               v => (/^[0-9]+$/.test(v)) || 'Door number must be valid',]"
                               label="Enter Door no"
                         ></v-text-field>
                          <v-text-field
                            v-model="formInput.street"
                            label="Enter street"
                            placeholder="enter street"
                            :rules="[
                              v => !!v || 'street name is required',
                              v => (v && v.length <= 20)]"
                          ></v-text-field>
                          <v-text-field
                            v-model="formInput.landmark"
                            label="Enter landmark"
                            placeholder="enter landmark"
                            :rules="[
                              v => !!v || 'landmark name is required',
                              v => (v && v.length <= 20)]"
                          ></v-text-field>
                          <v-text-field
                            v-model="formInput.area"
                            label="Enter area"
                            placeholder="enter area"
                            :rules="[
                              v => !!v || 'area name is required',
                              v => (v && v.length <= 20)]"
                          ></v-text-field>
                          <v-text-field
                          v-model="formInput.pincode"
                          :rules="[
                             v => !!v || 'pincode is required',
                             v =>v && v.length==10,
                             v => (/^[0-9]+$/.test(v)) || 'pincode must be valid',]"
                             label="Enter pincode"
                       ></v-text-field>
                        </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="Grey"
                      text
                      @click="closed"
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
        no:"",
        street:"",
        landmark:"",
        area:"",
        pincode:"",
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
            val || this.closed();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    async mounted() {
    await Vue.axios.get("http://127.0.0.1:3333/hotels/select").then((res)=>{
            this.list=res.data;
            console.warn(res.data);
            })

    },
    methods: {
        async  insert(){
        await Vue.axios.post("http://127.0.0.1:3333/hotels/insert",this.formInput).then((res)=>{
            console.log(res)          
          })
        },
        async read(){
            await Vue.axios.get("http://127.0.0.1:3333/hotels/select").then((res)=>{
            this.list=res.data;
            console.log(res.data);
            })
        },
        async deleteItem(id){
           await axios.delete(`http://127.0.0.1:3333/hotels/delete/${id}`)
           this.read()
        },
        Changed(value) {
            console.log(value);
            this.list = value.data;
        },
        async save() {
            this.button = true;
            await axios.put(`http://127.0.0.1:3333/hotels/update/${band.id}`,this.formInput)
                .then((res) => {
                console.warn((res));
            });
        },
        editItem(item) {
            this.fork = false;
            this.dialog = true;
            band = item;
            this.formInput={name :item.name,no : item.no,street:item.street,landmark:item.landmark,area:item.area,pincode:item.pincode}
        },
        closed() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.dialog = false;
            this.$refs.form.reset();
        },
        getData(value){
          this.forms=value.data
        },

        async asc(val){
          await axios.read(`http://127.0.0.1:3333/hotels/nameA/${val}`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },
        async desc(val){
          await axios.read(`http://127.0.0.1:3333/hotels/nameD/${val}`).then((res)=>{
            console.warn(res);
            this.forms=res.data
          })
        },
    },
    components:{searched}
    
}
  </script>
  