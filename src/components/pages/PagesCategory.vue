<script setup lang="ts">
import { computed } from 'vue';
import ForumList from '../ForumList.vue';
import sourceData from '../../data.json';

const props = defineProps<{
  id: string;
}>();

const category = computed(() =>
  sourceData.categories.find((category) => category.id === props.id)
);

const getForumsForCategory = (category: any) => {
  return sourceData.forums.filter((forum) => forum.categoryId === category.id);
};
</script>
<template>
  <h1>{{ category?.name }}</h1>
  <ForumList :title="category?.name" :forums="getForumsForCategory(category)" />
</template>
