<script setup lang="ts">
import { computed } from 'vue';
import { useDataSource } from '../../store/dataSource';
import { useRouter } from 'vue-router';
import ThreadEditor from '../ThreadEditor.vue';

const router = useRouter();
const store = useDataSource();

const props = defineProps<{
  forumId: string;
}>();

const forum = computed(() => {
  return store.dataSource.forums.find((forum) => forum.id === props.forumId);
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
      Create new thread in <i>{{ forum?.name }}</i>
    </h1>

    <thread-editor @save="save" @cancel="cancel" />
  </div>
</template>
