<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/', icon: '⌂' },
  { label: 'Jobs', to: '/jobs', icon: '▣' },
  { label: 'Quotes', to: '/quotes', icon: '◫' },
  { label: 'Invoices', to: '/invoices', icon: '$' },
  { label: 'Customers', to: '/customers', icon: '◎' },
  { label: 'Inventory', to: '/inventory', icon: '□' },
  { label: 'Reports', to: '/reports', icon: '▤' },
  { label: 'Team', to: '/team', icon: '◉' },
  { label: 'Settings', to: '/settings', icon: '⚙' }
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <aside class="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200/70 bg-white/80 p-5 backdrop-blur lg:block">
    <NuxtLink to="/" class="flex items-center gap-3">
      <div class="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
        JT
      </div>
      <div>
        <div class="text-lg font-bold tracking-tight">JobTally</div>
        <div class="text-xs text-slate-500">Business control centre</div>
      </div>
    </NuxtLink>

    <nav class="mt-8 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
        :class="isActive(item.to)
          ? 'bg-slate-900 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'"
      >
        <span class="grid h-6 w-6 place-items-center text-xs">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div class="text-sm font-semibold">Coastal Electrical</div>
      <div class="mt-1 text-xs text-slate-500">Gold Coast, QLD</div>
      <div class="mt-3 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        Pro Plan
      </div>
    </div>

    <div class="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-3xl bg-slate-50 p-3">
      <div class="grid h-10 w-10 place-items-center rounded-full bg-slate-200 text-sm font-bold">
        DR
      </div>
      <div class="min-w-0">
        <div class="truncate text-sm font-semibold">Daniel Roberts</div>
        <div class="text-xs text-slate-500">Admin</div>
      </div>
    </div>
  </aside>
</template>