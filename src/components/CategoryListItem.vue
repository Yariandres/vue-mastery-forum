<script setup lang="ts">
import { ref } from 'vue';
import ForumList from './ForumList.vue';
import sourceData from '../data.json';

const forums = ref(sourceData.forums);
</script>
<template>
  <div class="forum-list">
    <h2 class="list-title">
      <a href="#">Forum</a>
    </h2>
    <forum-list :forums="forums" />
  </div>
</template>
