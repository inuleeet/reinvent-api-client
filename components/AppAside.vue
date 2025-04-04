<script setup lang="ts">
import type { HttpMethodBadge } from '~/components/HttpMethodBadge.vue';

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

const collectionChildren = ref([
  {
    label: 'Todos',
    value: 'get-todo',
  },
  {
    label: 'Todos',
    value: 'post-todo',
  },
  {
    label: 'Todos',
    value: 'put-todo',
  },
  {
    label: 'Todos',
    value: 'patch-todo',
  },
  {
    label: 'Todos',
    value: 'delete-todo',
  },
]);

const selectedChild = ref(collectionChildren.value.at(0)?.value);
const childHighlighter = ref('0');

function selectChild(index: number): void {
  selectedChild.value = collectionChildren.value.at(index)?.value;
  childHighlighter.value = index
    ? `calc(${index * 2.375}rem + ${index * 0.25}rem)`
    : '0';
}
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

    <div class="flex items-center gap-1">
      <USelectMenu
        default-value="JSON Placeholder"
        :items="['JSON Placeholder']"
        class="flex-1"
      />

      <UButton icon="i-lucide-plus" />
    </div>

    <div class="flex-1">
      <div
        class="pl-2 flex flex-col gap-1 relative before:content-[''] before:bg-(--ui-bg-muted) before:w-px before:h-full before:absolute before:left-0 before:top-0 after:content-[''] after:bg-(--ui-primary) after:rounded-md after:w-[3px] after:h-9 after:absolute after:-left-px after:transition-all"
        data-list="collection-children"
      >
        <UButton
          v-for="({ label, value }, index) in collectionChildren"
          :key="value"
          :variant="selectedChild === value ? 'soft' : 'ghost'"
          color="neutral"
          @click="selectChild(index)"
        >
          <div class="w-[2.999rem]">
            <HttpMethodBadge
              :label="value.split('-').at(0)?.toUpperCase() as HttpMethodBadge"
            />
          </div>

          <span>{{ label }}</span>
        </UButton>
      </div>
    </div>

    <UAlert
      color="warning"
      variant="subtle"
      title="Heads up!"
      description="The light mode colors have not yet been fully updated."
      icon="i-lucide-terminal"
    />

    <UButton
      color="neutral"
      variant="outline"
      class="justify-center select-none"
    >
      <UIcon name="i-lucide-plus" />
      <span>Add new request</span>
    </UButton>
  </aside>
</template>

<style scoped>
[data-list='collection-children']::after {
  top: v-bind(childHighlighter);
}
</style>
