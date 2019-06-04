<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    />
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "./components/SignupForm";
export default {
  name: "app",
  components: {
    SignupForm
  },
  data: () => {
    return {};
  }
};
</script>

<style lang="scss"></style>
