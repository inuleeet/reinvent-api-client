<script setup lang="ts">
import { DisclaimerModal } from '#components';

useHead({
  title: 'API Client',
});
</script>

<template>
  <UApp>
    <div class="h-screen flex relative">
      <AppAside />
      <AppContent />

      <UButton
        label="?"
        class="rounded-full size-9 justify-center select-none fixed right-4 bottom-4"
        @click="useOverlay().create(DisclaimerModal).open()"
      />
    </div>
  </UApp>
</template>
