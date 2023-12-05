<script setup lang="ts">
import { computed } from 'vue';
import ThreadList from '../ThreadList.vue';
import { storeToRefs } from 'pinia';
import { useDataSource } from '../../store/dataSource';
import findById from '../../helpers/findById';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

const props = defineProps<{
  id: string;
}>();

const forum = computed(() => {
  return findById(dataSource.value.forums, props.id);
});

const treads = computed(() => {
  return dataSource.value.threads.filter(
    (thread) => thread.forumId === props.id
  );
});
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum?.name }}</h1>
        <p class="text-lead">{{ forum?.description }}</p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum?.id } }"
        class="btn-green btn-small"
        >Start a thread</router-link
      >
    </div>
  </div>

  <div class="col-full push-top">
    <thread-list :threads="treads" />
  </div>
</template>
