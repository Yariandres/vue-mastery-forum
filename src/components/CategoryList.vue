<script setup lang="ts">
import sourceData from '../data.json';
import ForumList from './ForumList.vue';

defineProps<{
  categories: any;
}>();

const getForumsForCategory = (category: any) => {
  return sourceData.forums.filter((forum) => forum.categoryId === category.id);
};
</script>
<template>
  <forum-list
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :category-name="category.name"
  />
</template>
