<template>
  <header class="flex items-center justify-between gap-4">
    <div class="w-full max-w-xl">
      <div class="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span class="text-slate-400">⌕</span>
        <input
          class="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Search jobs, customers, quotes..."
        >
        <kbd class="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-400">⌘ K</kbd>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button class="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
        +
      </button>
      <button class="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600">
        🔔
      </button>
      <button class="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600">
        ?
      </button>
    </div>
  </header>
</template>