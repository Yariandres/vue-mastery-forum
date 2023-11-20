<script setup lang="ts">
import { ref } from 'vue';
import CategoryList from '../CategoryList.vue';
import sourceData from '../../data.json';

const categories = ref(sourceData.categories);
</script>

<template>
  <h1>Welcome to forum</h1>
  <category-list :categories="categories" />
</template>
