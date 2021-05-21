<template>
  <div id="app">
    <navigation 
      :login="login"
      :logout="logout"
      :userProfile="userProfile"
      :loggedIn="loggedIn"
    >
    </navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from './components/Navigation.vue';
export default {
  name: 'App',
  components: {
    Navigation
  }, 
  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile',
      loggedIn: 'loggedIn'
    })
  },
  methods: {
    ...mapActions('user', {
      login: 'login',
      logout: 'logout'
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

#app {
  font-family: 'Open Sans', Avenir sans-serif;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
