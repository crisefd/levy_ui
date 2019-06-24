<template>
  <div class="dashboard">
    <h1>Dashboard!</h1>
  </div>
</template>

<script>
import { levyService } from "@/services";
export default {
  name: "dashboard",
  created() {
    levyService
    .listUsers()
    .subscribe(users => {
      console.log("USERS => ", users);
    })
  }
};
</script>

<style lang="scss" scoped></style>
