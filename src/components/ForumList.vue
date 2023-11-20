<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps<{
  forums: any;
  title: string | undefined;
  categoryId?: string;
}>();
</script>
<template>
  <div class="col-full">
    <div class="forum-list">
      <div class="list-title">
        <router-link
          v-if="categoryId"
          :to="{ name: 'Category', params: { id: categoryId } }"
          >{{ title }}</router-link
        >
        <span v-else>{{ title }}</span>
      </div>
      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{ name: 'Forum', params: { id: forum.id } }"
            class="text-xlarge"
            >{{ forum.name }}</router-link
          >
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length || 0 }}</span
            >{{ forum.threads?.length === 1 ? ' Thread' : ' Threads' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
