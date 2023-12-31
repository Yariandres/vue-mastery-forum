<script setup lang="ts">
import { computed } from 'vue';
import PostList from '../PostList.vue';
import PostEditor from '../PostEditor.vue';
import { storeToRefs } from 'pinia';
import { useDataSource } from '../../store/dataSource';
import AppDate from '../AppDate.vue';

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

const thread = computed<any>(() => {
  return store.thread(props.id);
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

  store.createPost(post);
};
</script>

<template>
  <div v-if="thread" class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>

    <div class="flex-row justify-between">
      <p>
        By <a href="#" class="link-unstyled">{{ thread.author.name }}</a
        >, <app-date :timestamp="thread.publishedAt" />
      </p>
      <span class="hide-mobile text-faded text-small">
        {{ thread.repliesCount }} replies, by
        {{ thread.contributorsCount }} contributors &#183;
      </span>
    </div>

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
