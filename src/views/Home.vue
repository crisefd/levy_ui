<template>
  <div class="home"></div>
</template>

<script>
import { router } from "../services/";

export default {
  name: "home",
  components: {},
  created() {
    router.push({ name: "signin" });
  }
};
</script>
