<template>
  <div class="default"></div>
</template>

<script>
import { router } from "../services/";

export default {
  name: "default",
  components: {},
  created() {
    router.push("/dashboard");
  }
};
</script>
