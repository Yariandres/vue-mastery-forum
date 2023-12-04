<script setup lang="ts">
import { computed, reactive } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (event: 'save', payload: { title: string; text: string }): void;
  (event: 'cancel'): void;
}>();

const props = defineProps<{
  title?: string;
  text?: string;
}>();

const form = reactive<{
  title: string;
  text: string;
}>({
  title: props.title || '',
  text: props.text || '',
});

const save = () => {
  emit('save', { ...form });
};

const existing = computed(() => {
  return !!props.title;
});
</script>

<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title</label>
      <input
        v-model="form.title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>
    <div class="form-group">
      <label for="thread_content">Content</label>
      <textarea
        v-model="form.text"
        type="text"
        id="thread_content"
        class="form-input"
        name="content"
      />
    </div>
    <div class="form-group">
      <button @click="emit('cancel')" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-blue">
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>
