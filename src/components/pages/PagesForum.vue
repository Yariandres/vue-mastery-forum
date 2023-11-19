<script setup lang="ts">
import { computed } from 'vue';
import ThreadList from '../ThreadList.vue';
import sourceData from '../../data.json';
const props = defineProps<{
  id: string;
}>();

const forum = computed(() => {
  return sourceData.forums.find((forum) => forum.id === props.id);
});

const treads = computed(() => {
  return sourceData.threads.filter((thread) => thread.forumId === props.id);
});
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum?.name }}</h1>
        <p class="text-lead">{{ forum?.description }}</p>
      </div>
    </div>
  </div>

  <div class="col-full push-top">
    <thread-list :threads="treads" />
  </div>
</template>
