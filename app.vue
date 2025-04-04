<script setup lang="ts">
useHead({
  title: 'API Client',
});

const childHighlighter = ref('0px');

const value = ref('');
const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const method = ref(methods[0]);

const result = ref<unknown>();
const duration = ref<number>();
const loading = ref<boolean>();

async function run() {
  loading.value = true;

  const startTime = performance.now();

  const { data, status } = await useFetch(value);

  if (status.value === 'success') {
    duration.value = Math.round(performance.now() - startTime);
    result.value = data.value;
    loading.value = false;
  }
}
</script>

<template>
  <UApp>
    <div class="h-screen flex">
      <AppAside />

      <main
        v-if="false"
        class="flex-1 p-4 pl-2 flex flex-col gap-4"
      >
        <div
          class="pb-2 flex items-center gap-1 relative before:content-[''] before:bg-(--ui-bg-muted) before:w-full before:h-px before:absolute before:left-0 before:bottom-0 after:content-[''] after:bg-(--ui-primary) after:rounded-md after:w-[10rem] after:h-[3px] after:absolute after:-bottom-px after:transition-all"
          data-list="collection-children"
        >
          <UButton
            color="neutral"
            variant="soft"
            label="JSON Placeholder"
            class="w-[10rem]"
          />

          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-plus"
          />
        </div>

        <div>
          <UButtonGroup
            class="w-full"
            size="lg"
          >
            <USelect
              v-model="method"
              :items="methods"
              variant="subtle"
              class="w-[7.353rem]"
            />

            <UInput
              v-model="value"
              class="flex-1"
              placeholder="Enter URL"
            />

            <UButton
              color="neutral"
              variant="subtle"
              icon="i-lucide-send"
              @click="run"
            />
          </UButtonGroup>
        </div>

        <div class="flex-1 grid grid-cols-2 gap-4">
          <div class="p-4">
            <span>Pwede bang wala na lang na query params and env 😫</span>
          </div>

          <div class="border-(--ui-border-muted) border rounded-md">
            <div class="p-4 flex items-center justify-between">
              <span>Response</span>

              <span
                v-if="!loading && duration"
                class="text-(--ui-success) text-xs"
              >
                {{ `${duration} ms` }}
              </span>
            </div>

            <div
              class="bg-(--ui-bg-muted) rounded-b-md w-[calc((((100svw-19rem)-1.5rem)/2)-2px)] h-[calc(100svh-12.625rem)]"
            >
              <div
                v-if="loading"
                class="h-full grid place-items-center"
              >
                <UIcon
                  name="i-lucide-loader"
                  class="text-(--ui-primary) animate-spin"
                />
              </div>

              <div
                v-else
                class="h-full overflow-auto p-4"
              >
                <pre class="text-xs">{{ result }}</pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </UApp>
</template>

<style scoped>
[data-list='collection-children']::after {
  left: v-bind(childHighlighter);
}
</style>
