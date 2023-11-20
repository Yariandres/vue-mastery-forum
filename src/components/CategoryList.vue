<script setup lang="ts">
import ForumList from './ForumList.vue';
import { storeToRefs } from 'pinia';
import { useDataSource } from '../store/dataSource';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

defineProps<{
  categories: any;
}>();

const getForumsForCategory = (category: any) => {
  return dataSource.value.forums.filter(
    (forum) => forum.categoryId === category.id
  );
};
</script>
<template>
  <forum-list
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
    :categoryId="category.id"
  />
</template>
