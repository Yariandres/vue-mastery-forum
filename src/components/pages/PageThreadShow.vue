<script setup lang="ts">
import { computed, ref } from 'vue';
import PostList from '../PostList.vue';
import PostEditor from '../PostEditor.vue';
import { storeToRefs } from 'pinia';
import { useDataSource } from '../../store/dataSource';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

interface EventData {
  post: {
    text: string;
    publishedAt: number;
    id: string;
    userId: string;
  };
}

const props = defineProps<{
  id: string;
}>();

// const threads = ref(dataSource.value.threads);
// const posts = ref(dataSource.value.posts);

const thread = computed<any>(() => {
  return dataSource.value.threads.find((thread) => thread.id === props.id);
});

const threadPosts = computed<any>(() => {
  return dataSource.value.posts.filter(
    (post: any) => post.threadId === props.id
  );
});

const addPost = (eventData: EventData) => {
  const post = {
    ...eventData.post,
    threadId: props.id,
  };

  dataSource.value.posts.push(post);
  thread.value.posts.push(post.id);
};
</script>

<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <post-list :posts="threadPosts" />

    <div class="col-full">
      <post-editor @update:save="addPost" />
    </div>
  </div>

  <div v-else>
    <div class="col-full text-center">
      <h1>This Thread does not exist</h1>
      <router-link :to="{ name: 'Home' }">
        &#8592; Back to some cool threads
      </router-link>
    </div>
  </div>
</template>
