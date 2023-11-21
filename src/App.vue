<template>
  <the-navbar />
  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import TheNavbar from './components/TheNavbar.vue';
</script>
