<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[#f6f8fb] text-slate-900">
    <div class="flex min-h-screen">
      <AppSidebar />

      <main class="flex-1 px-6 py-5 lg:px-8">
        <AppHeader />

        <div class="mt-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>