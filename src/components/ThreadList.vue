<script setup lang="ts">
import { computed } from 'vue';
import AddpDate from './AppDate.vue';
import findById from '../helpers/findById';

import { storeToRefs } from 'pinia';
import { useDataSource } from '../store/dataSource';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

defineProps<{
  threads: any;
}>();

const users = computed(() => {
  return dataSource.value.users;
});

function userById(userId: string) {
  return findById(users.value, userId);
}
</script>
<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'ThreadShow', params: { id: thread.id } }"
              >{{ thread.title }}</router-link
            >
          </p>

          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId)?.name }}</a
            >,
            <AddpDate :timestamp="thread.publishedAt" />
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.posts?.length || 0 }}
            {{ thread.posts?.length === 1 ? ' Reply' : ' Replies' }}
          </p>

          <img class="avatar-medium" :src="userById(thread.userId)?.avatar" />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId)?.name }}</a>
            </p>
            <AddpDate :timestamp="thread.publishedAt" class="text-xsmall" />
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button class="btn-click" disabled>
        <i class="fa fa-angle-left">L</i>
      </button>
      1 of 2
      <button class="btn-click" disabled>
        <i class="fa fa-angle-right">R</i>
      </button>
    </div>
  </div>
</template>
