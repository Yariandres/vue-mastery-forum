<script setup lang="ts">
import { diffForHummans, humanFriendlyDate } from '../helpers/appDate';

defineProps<{
  timestamp: number;
}>();
</script>
<template>
  <span :title="humanFriendlyDate(timestamp)" v-bind="$attrs">
    {{ diffForHummans(timestamp) }}
  </span>
</template>
