<script setup lang="ts">
import { computed } from 'vue';
import ForumList from '../ForumList.vue';
import { storeToRefs } from 'pinia';
import { useDataSource } from '../../store/dataSource';
import findById from '../../helpers/findById';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

const props = defineProps<{
  id: string;
}>();

const category = computed(() =>
  findById(dataSource.value.categories, props.id)
);

const getForumsForCategory = (category: any) => {
  return dataSource.value.forums.filter(
    (forum) => forum.categoryId === category.id
  );
};
</script>
<template>
  <h1>{{ category?.name }}</h1>
  <ForumList :title="category?.name" :forums="getForumsForCategory(category)" />
</template>
