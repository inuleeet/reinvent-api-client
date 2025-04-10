<script setup lang="ts">
const collectionsStore = useCollectionsStore();
const { activeCollection, activeCollectionItem }
  = storeToRefs(collectionsStore);

const shiki = useShiki();

const label = computed(() => {
  return activeCollectionItem.value?.url.at(
    activeCollectionItem.value?.url.length,
  ) === '/'
    ? activeCollectionItem.value?.url
    : `${activeCollectionItem.value?.url}/`;
});

const result = ref<unknown>();
const duration = ref<number>();
const loading = ref<boolean>();
const params = ref<string>();

async function invokeFetch() {
  loading.value = true;

  let startTime: number;

  const response = await $fetch(
    params.value ? `${label.value}${params.value}` : label.value,
    {
      method: activeCollectionItem.value?.method,
      cache: 'no-cache',
      onRequest() {
        startTime = performance.now();
      },
      onResponse() {
        duration.value = Math.floor(performance.now() - startTime);
      },
    },
  );

  if (response)
    result.value = await shiki.highlightCode(JSON.stringify(response, null, 2));

  loading.value = false;
}
</script>

<template>
  <main class="flex-1 p-4 pl-2">
    <div class="size-full flex flex-col gap-4">
      <div class="grid">
        <span class="text-(--ui-primary) text-xl font-semibold">
          {{ activeCollection?.name }}
        </span>

        <span class="text-(--ui-text-muted) text-xs">
          {{ activeCollection?.description }}
        </span>
      </div>

      <UButtonGroup
        class="w-full"
        size="lg"
      >
        <UButton
          color="neutral"
          variant="subtle"
          :label
        />

        <UInput
          v-model="params"
          class="flex-1"
          placeholder="Enter query parameters"
        />

        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide-send"
          @click="invokeFetch"
        />
      </UButtonGroup>

      <div class="flex-1 grid grid-cols-2 gap-4">
        <div />

        <div class="border-(--ui-border-muted) border rounded-md">
          <div class="p-4 flex items-center justify-between">
            <span>Response</span>

            <span
              v-if="duration"
              :class="[
                'text-xs',
                duration <= 1000
                  ? 'text-(--ui-success)'
                  : duration <= 2000
                    ? 'text-(--ui-warning)'
                    : 'text-(--ui-error)',
              ]"
            >
              {{ `${duration} ms` }}
            </span>
          </div>

          <div
            class="bg-(--ui-bg-muted) rounded-b-md w-[calc((((100svw-19rem)-1.5rem)/2)-2px)] h-[calc(100svh-12.625rem)]"
          >
            <div
              v-if="!loading"
              class="rounded-b-[inherit] size-full flex flex-col overflow-auto"
            >
              <div
                class="text-xs"
                v-html="result"
              />

              <div class="bg-[#282c34] flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
