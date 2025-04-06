<script setup lang="ts"></script>

<template>
  <UModal
    class="max-w-[65rem] p-4"
    :ui="{ content: 'max-h-[40rem]' }"
  >
    <template #content>
      <div class="p-4">
        <p class="text-sm">
          The API response times displayed in this application may differ from
          those in your browser's Network tab for the following reasons:
        </p>

        <div class="my-4 grid grid-cols-3 gap-1">
          <div
            class="border-(--ui-border-muted) border rounded-md p-4 flex flex-col gap-1"
          >
            <UIcon
              name="i-lucide-gauge"
              :size="32"
            />

            <span class="text-(--ui-primary) font-bold">
              Different measurement points
            </span>

            <p class="text-sm">
              This application measures JavaScript execution time, while Network
              tab includes DNS lookup, connection setup, and TLS handshakes
            </p>
          </div>

          <div
            class="border-(--ui-border-muted) border rounded-md p-4 flex flex-col gap-1"
          >
            <UIcon
              name="i-lucide-package-search"
              :size="32"
            />

            <span class="text-(--ui-primary) font-bold">
              Processing overhead
            </span>

            <p class="text-sm">
              This metrics include time to parse the JSON response, which
              Network tab reports separately
            </p>
          </div>

          <div
            class="border-(--ui-border-muted) border rounded-md p-4 flex flex-col gap-1"
          >
            <UIcon
              name="i-lucide-globe"
              :size="32"
            />

            <span class="text-(--ui-primary) font-bold">
              Browser optimizations
            </span>

            <p class="text-sm">
              The browser may implement caching, connection pooling, and other
              optimizations not reflected in this measurements
            </p>
          </div>
        </div>

        <UAlert
          color="info"
          variant="subtle"
          description="Both measurements are valid but serve different purposes. This
        application's timing reflects the actual user experience, while the
        Network tab provides more technical details for debugging."
          icon="i-lucide-info"
        />
      </div>
    </template>
  </UModal>
</template>
