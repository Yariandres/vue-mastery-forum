<script setup lang="ts">
import { ref } from 'vue';
import ForumList from '../ForumList.vue';
import sourceData from '../../data.json';

const forums = ref(sourceData.forums);
</script>

<template>
  <h1>Welcome to forum</h1>
  <forum-list :forums="forums" />
</template>
