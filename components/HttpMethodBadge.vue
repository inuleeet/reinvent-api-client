<script setup lang="ts">
import type { NuxtUIColorTheme } from '~/types/color-theme';
import type { HttpMethod } from '~/types/http-method';

const { label } = defineProps<{ label: HttpMethod }>();

const color = computed(() => {
  let $color: NuxtUIColorTheme = undefined;

  if (label === 'GET') $color = 'success';
  else if (label === 'POST') $color = 'warning';
  else if (label === 'PUT') $color = 'info';
  else if (label === 'PATCH') $color = 'neutral';
  else $color = 'error';

  return $color;
});
</script>

<template>
  <UBadge
    :color
    :label
    size="sm"
    class="w-max select-none"
    variant="subtle"
  />
</template>
