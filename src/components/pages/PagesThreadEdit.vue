<script setup lang="ts">
import { computed } from 'vue';
import { useDataSource } from '../../store/dataSource';
import { useRouter } from 'vue-router';
import ThreadEditor from '../ThreadEditor.vue';
import findById from '../../helpers/findById';

const router = useRouter();
const store = useDataSource();

const props = defineProps<{
  id: string;
}>();

const thread = computed(() => {
  return findById(store.dataSource.threads, props.id);
});

const text = computed(() => {
  return store.dataSource.posts.find(
    (post) => post.id === thread.value?.posts[0]
  )?.text;
});

const save = async ({ title, text }: { title: string; text: string }) => {
  const thread = await store.updateThread({
    id: props.id,
    title,
    text,
  });

  router.push({ name: 'ThreadShow', params: { id: thread?.id } });
};

const cancel = () => {
  router.push({ name: 'ThreadShow', params: { id: props.id } });
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
