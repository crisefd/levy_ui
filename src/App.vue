<template>
  <div  id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    />
    <!-- <div v-if="alert.message" :class="`alert ${alert.type}`">
            {{ alert.message }}
    </div> -->
   <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    // ...mapState({
    //   alert: state => state.alert
    // })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route(to, from) {
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss"></style>
