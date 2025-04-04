<script setup lang="ts">
export type HttpMethodBadge = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const { label } = defineProps<{ label: HttpMethodBadge }>();

const color = computed(() => {
  let $color = '';

  if (label === 'GET') $color = 'success';
  else if (label === 'POST') $color = 'warning';
  else if (label === 'PUT') $color = 'info';
  else if (label === 'PATCH') $color = 'neutral';
  else $color = 'error';

  return $color as
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'neutral'
    | undefined;
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
