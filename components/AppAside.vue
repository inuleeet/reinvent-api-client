<script setup lang="ts">
import { NewCollectionModal, NewRequestModal } from '#components';

const overlay = useOverlay();

const collectionsStore = useCollectionsStore();
const {
  collections,
  activeCollection,
  activeCollectionItem,
  activeCollectionModel,
} = storeToRefs(collectionsStore);

const accountMenu = [
  {
    label: 'Toggle Theme',
    icon: 'i-lucide-sun-moon',
    onSelect: () => {
      const colorMode = useColorMode();
      colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    },
  },
  {
    label: 'Sign In',
    icon: 'i-lucide-log-in',
  },
];

const activeCollectionHighlighter = computed(() => {
  if (!collections.value?.length || !activeCollection.value) return '0';

  const index = activeCollection.value.items.findIndex(($item) => {
    return $item.id === activeCollectionItem.value?.id;
  });

  return index ? `calc(${index * 2.375}rem + ${index * 0.25}rem)` : '0';
});
</script>

<template>
  <aside class="w-72 h-full p-4 pr-2 flex flex-col gap-4">
    <UDropdownMenu
      :items="accountMenu"
      :content="{
        align: 'start',
        side: 'bottom',
        sideOffset: 8,
      }"
      :ui="{
        content: 'w-[16.5rem]',
      }"
    >
      <UButton
        color="neutral"
        variant="subtle"
      >
        <NuxtImg
          src="guest.png"
          width="100"
          height="100"
          class="bg-(--ui-primary) rounded-full size-4"
        />

        <span class="truncate select-none">Guest Account</span>
      </UButton>
    </UDropdownMenu>

    <USeparator />

    <template v-if="collections?.length">
      <div class="flex items-center gap-1">
        <USelectMenu
          v-model="activeCollectionModel"
          class="flex-1"
          :items="
            collections?.map(($collection) => ({
              label: $collection.name,
              value: $collection.id,
            }))
          "
          :ui="{ content: 'w-[16.5rem] ml-2' }"
          :content="{}"
        />

        <UButton
          icon="i-lucide-plus"
          @click="overlay.create(NewCollectionModal).open()"
        />
      </div>

      <div
        v-if="activeCollection?.items.length"
        class="flex-1"
      >
        <div
          :class="[
            'pl-2 flex flex-col gap-1 relative',
            collections?.length &&
              activeCollectionItem &&
              `before:content-[''] before:bg-(--ui-bg-muted) before:w-px before:h-full before:absolute before:left-0 before:top-0  after:content-[''] after:bg-(--ui-primary) after:rounded-md after:w-[3px] after:h-9 after:absolute after:-left-px after:transition-all`,
          ]"
          data-list="collection-children"
        >
          <UButton
            v-for="{ id, name, method } in activeCollection?.items"
            :key="id"
            :variant="activeCollectionItem?.id === id ? 'soft' : 'ghost'"
            color="neutral"
            @click="collectionsStore.setActiveCollectionItem(id)"
          >
            <div class="w-[2.999rem]">
              <HttpMethodBadge :label="method" />
            </div>

            <span>{{ name }}</span>
          </UButton>
        </div>
      </div>

      <div
        v-else
        class="border-(--ui-border-muted) border border-dashed rounded-md flex-1 grid place-items-center select-none"
      >
        <span class="text-(--ui-text-muted) text-xs text-center text-balance">
          No available requests
        </span>
      </div>
    </template>

    <div
      v-else
      class="border-(--ui-border-muted) border border-dashed rounded-md flex-1 flex flex-col items-center justify-center gap-4 select-none"
    >
      <span class="text-(--ui-text-muted) text-xs text-center text-balance">
        Add collection first to view available requests
      </span>

      <UButton
        class="justify-center select-none"
        @click="overlay.create(NewCollectionModal).open()"
      >
        <UIcon name="i-lucide-plus" />
        <span>Add new collection</span>
      </UButton>
    </div>

    <UAlert
      color="warning"
      variant="subtle"
      title="Heads up!"
      description="The light mode colors have not yet been fully updated."
      icon="i-lucide-terminal"
    />

    <UButton
      v-if="collections?.length"
      color="neutral"
      variant="outline"
      class="justify-center select-none"
      @click="overlay.create(NewRequestModal).open()"
    >
      <UIcon name="i-lucide-plus" />
      <span>Add new request</span>
    </UButton>
  </aside>
</template>

<style scoped>
[data-list='collection-children']::after {
  top: v-bind(activeCollectionHighlighter);
}
</style>
