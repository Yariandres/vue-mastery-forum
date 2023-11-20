<script setup lang="ts">
import { computed } from 'vue';
import CategoryList from '../CategoryList.vue';
import { storeToRefs } from 'pinia';
import { useDataSource } from '../../store/dataSource';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

const categories = computed(() => dataSource.value.categories);
</script>

<template>
  <h1>Welcome to forum</h1>
  <category-list :categories="categories" />
</template>
