<template>
  <v-app>
    <router-link to="/customers"><v-btn>Customer</v-btn></router-link>
    <router-link to="/hotels"><v-btn>Hotels</v-btn></router-link>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
     
  },

};
</script>
