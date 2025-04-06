<script setup lang="ts">
import type { CollectionItem } from '~/types/collection';
import type { HttpMethod } from '~/types/http-method';

const collectionsStore = useCollectionsStore();

const methods = [
  { label: 'GET' },
  { label: 'POST' },
  { label: 'PUT' },
  { label: 'PATCH' },
  { label: 'DELETE' },
];

const emit = defineEmits<{ close: [boolean] }>();

const method = ref('0');
const name = ref<string>();
const description = ref<string>();
const url = ref<string>();

const isCompleted = computed(() => {
  return name.value && description.value && url.value;
});

function addRequest() {
  if (!isCompleted.value) return;

  const collectionItem: CollectionItem = {
    id: crypto.randomUUID(),
    name: name.value!,
    description: description.value!,
    method: methods[Number(method.value)].label as HttpMethod,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  collectionsStore.addCollectionItem(collectionItem);
  collectionsStore.setActiveCollectionItem(collectionItem.id);

  emit('close', true);
}
</script>

<template>
  <UModal
    class="max-w-[30rem]"
    title="Add New Request"
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <div class="grid gap-4">
        <UTabs
          v-model="method"
          :content="false"
          :items="methods"
        />

        <UInput
          v-model.trim="name"
          placeholder=""
          :ui="{ base: 'peer' }"
          autofocus
        >
          <label
            class="pointer-events-none absolute left-0 -top-2.5 text-(--ui-text-highlighted) text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-(--ui-text-highlighted) peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-(--ui-text-dimmed) peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
          >
            <span class="inline-flex bg-(--ui-bg) px-1">Name</span>
          </label>
        </UInput>

        <UInput
          v-model.trim="description"
          placeholder=""
          :ui="{ base: 'peer' }"
        >
          <label
            class="pointer-events-none absolute left-0 -top-2.5 text-(--ui-text-highlighted) text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-(--ui-text-highlighted) peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-(--ui-text-dimmed) peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
          >
            <span class="inline-flex bg-(--ui-bg) px-1">Description</span>
          </label>
        </UInput>

        <UInput
          v-model.trim="url"
          placeholder=""
          :ui="{ base: 'peer' }"
        >
          <label
            class="pointer-events-none absolute left-0 -top-2.5 text-(--ui-text-highlighted) text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-(--ui-text-highlighted) peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-(--ui-text-dimmed) peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
          >
            <span class="inline-flex bg-(--ui-bg) px-1">URL</span>
          </label>
        </UInput>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Add request"
        :disabled="!isCompleted"
        @click="addRequest"
      />
    </template>
  </UModal>
</template>
