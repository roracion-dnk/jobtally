<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const statusClass = computed(() => {
  const value = props.status.toLowerCase()

  if (['paid', 'accepted', 'active'].includes(value)) {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (['sent', 'viewed', 'partial'].includes(value)) {
    return 'bg-blue-100 text-blue-700'
  }

  if (['overdue', 'rejected'].includes(value)) {
    return 'bg-rose-100 text-rose-700'
  }

  if (['pending', 'draft'].includes(value)) {
    return 'bg-amber-100 text-amber-700'
  }

  return 'bg-slate-100 text-slate-600'
})
</script>

<template>
  <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass">
    {{ status }}
  </span>
</template>