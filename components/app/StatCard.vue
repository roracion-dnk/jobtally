<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  helper?: string
  tone?: 'blue' | 'green' | 'orange' | 'purple' | 'slate'
}>()

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  orange: 'bg-orange-50 text-orange-700',
  purple: 'bg-violet-50 text-violet-700',
  slate: 'bg-slate-100 text-slate-700'
}
</script>

<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm text-slate-500">{{ label }}</p>
        <p class="mt-2 text-2xl font-bold tracking-tight">{{ value }}</p>
        <p v-if="helper" class="mt-2 text-xs text-slate-500">{{ helper }}</p>
      </div>

      <div class="grid h-11 w-11 place-items-center rounded-2xl text-sm font-bold" :class="toneClasses[tone || 'blue']">
        ●
      </div>
    </div>
  </div>
</template>