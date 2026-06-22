<script setup lang="ts">
import type { Quote } from '~/composables/useDemoData'

const { quotes, currency } = useDemoData()

const selectedQuote = ref<Quote>(quotes.value[0])
const activeStatus = ref('All')

const statuses = ['All', 'Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected']

const filteredQuotes = computed(() => {
  if (activeStatus.value === 'All') return quotes.value
  return quotes.value.filter(quote => quote.status === activeStatus.value)
})
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Quotes</h1>
        <p class="mt-1 text-slate-500">Create, manage and track all your quotes.</p>
      </div>

      <button class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm">
        Create Quote
      </button>
    </div>

    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="status in statuses"
        :key="status"
        class="rounded-full px-4 py-2 text-sm font-medium"
        :class="activeStatus === status ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'"
        @click="activeStatus = status"
      >
        {{ status }}
      </button>
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
      <AppSectionCard class="overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-100 p-5">
          <input class="rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none" placeholder="Search quotes...">
          <button class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium">Filter</button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="px-5 py-4">Quote #</th>
                <th class="px-5 py-4">Customer</th>
                <th class="px-5 py-4">Job Type</th>
                <th class="px-5 py-4">Expiry</th>
                <th class="px-5 py-4 text-right">Value</th>
                <th class="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="quote in filteredQuotes"
                :key="quote.id"
                class="cursor-pointer hover:bg-slate-50"
                :class="selectedQuote.id === quote.id ? 'bg-blue-50/60' : ''"
                @click="selectedQuote = quote"
              >
                <td class="px-5 py-4 font-semibold text-blue-700">{{ quote.id }}</td>
                <td class="px-5 py-4">
                  <div class="font-medium">{{ quote.customer }}</div>
                  <div class="text-xs text-slate-500">{{ quote.location }}</div>
                </td>
                <td class="px-5 py-4">{{ quote.jobType }}</td>
                <td class="px-5 py-4">{{ quote.expiry }}</td>
                <td class="px-5 py-4 text-right font-semibold">{{ currency(quote.value) }}</td>
                <td class="px-5 py-4"><AppStatusBadge :status="quote.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppSectionCard>

      <AppSectionCard>
        <div class="border-b border-slate-100 p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold">{{ selectedQuote.id }}</h2>
              <p class="mt-1 text-sm text-slate-500">Created {{ selectedQuote.issueDate }}</p>
            </div>
            <AppStatusBadge :status="selectedQuote.status" />
          </div>
        </div>

        <div class="space-y-6 p-5">
          <div>
            <p class="text-sm text-slate-500">Customer</p>
            <p class="mt-1 font-semibold">{{ selectedQuote.customer }}</p>
            <p class="text-sm text-slate-500">{{ selectedQuote.location }}</p>
          </div>

          <div>
            <p class="text-sm text-slate-500">Quote Total</p>
            <p class="mt-1 text-3xl font-bold">{{ currency(selectedQuote.value) }}</p>
            <p class="text-sm text-slate-500">Inc. GST</p>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4">
            <h3 class="font-semibold">Line Items</h3>
            <div class="mt-4 space-y-3 text-sm">
              <div class="flex justify-between">
                <span>Labour</span>
                <span>{{ currency(selectedQuote.value * 0.55) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Materials</span>
                <span>{{ currency(selectedQuote.value * 0.35) }}</span>
              </div>
              <div class="flex justify-between">
                <span>GST</span>
                <span>{{ currency(selectedQuote.value * 0.1) }}</span>
              </div>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <button class="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Send</button>
            <button class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold">Edit</button>
            <button class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold">Duplicate</button>
            <button class="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">Convert to Invoice</button>
          </div>
        </div>
      </AppSectionCard>
    </div>
  </div>
</template>