<script setup lang="ts">
import type { Collection } from '~/types/collection';

const collectionsStore = useCollectionsStore();

const emit = defineEmits<{ close: [boolean] }>();

const name = ref<string>();
const description = ref<string>();

const isCompleted = computed(() => {
  return name.value && description.value;
});

function addCollection() {
  if (!isCompleted.value) return;

  const collection: Collection = {
    id: crypto.randomUUID(),
    name: name.value!,
    description: description.value!,
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  collectionsStore.addCollection(collection);
  collectionsStore.setActiveCollection(collection.id);

  emit('close', true);
}
</script>

<template>
  <UModal
    class="max-w-[30rem]"
    title="Add New Collection"
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UAlert
        color="info"
        variant="subtle"
        description="Collections are organized groups of API requests or resources that are grouped together for easier management and execution"
        icon="i-lucide-lightbulb"
      />

      <UInput
        v-model.trim="name"
        placeholder=""
        class="w-full mt-8 mb-2"
        :ui="{ base: 'peer' }"
        autofocus
      >
        <label
          class="pointer-events-none absolute left-0 -top-2.5 text-(--ui-text-highlighted) text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-(--ui-text-highlighted) peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-(--ui-text-dimmed) peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
        >
          <span class="inline-flex bg-(--ui-bg) px-1"> Name </span>
        </label>
      </UInput>

      <UInput
        v-model.trim="description"
        placeholder=""
        class="w-full mt-2"
        :ui="{ base: 'peer' }"
      >
        <label
          class="pointer-events-none absolute left-0 -top-2.5 text-(--ui-text-highlighted) text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-(--ui-text-highlighted) peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-(--ui-text-dimmed) peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
        >
          <span class="inline-flex bg-(--ui-bg) px-1"> Description </span>
        </label>
      </UInput>
    </template>

    <template #footer>
      <UButton
        label="Add Collection"
        :disabled="!name?.length"
        @click="addCollection"
      />
    </template>
  </UModal>
</template>
