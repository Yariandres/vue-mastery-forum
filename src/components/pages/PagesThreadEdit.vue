<script setup lang="ts">
import { computed } from 'vue';
import { useDataSource } from '../../store/dataSource';
import { useRouter } from 'vue-router';
import ThreadEditor from '../ThreadEditor.vue';

const router = useRouter();
const store = useDataSource();

const props = defineProps<{
  threadId: string;
}>();

const thread = computed(() => {
  return store.dataSource.threads.find(
    (thread) => thread.id === props.threadId
  );
});

const text = computed(() => {
  return store.dataSource.posts.find(
    (post) => post.id === thread.value?.posts[0]
  )?.text;
});

const save = async ({ title, text }: { title: string; text: string }) => {
  const thread = await store.createThread({
    title,
    text,
    forumId: forum.value?.id,
  });

  router.push({ name: 'ThreadShow', params: { id: thread?.id } });
};

const cancel = () => {
  router.push({ name: 'Forum', params: { id: forum.value?.id } });
};
</script>
<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread?.title }}</i>
    </h1>

    <thread-editor
      @save="save"
      @cancel="cancel"
      :text="text"
      :title="thread?.title"
    />
  </div>
</template>
