<script setup lang="ts">
const { quotes, invoices, currency } = useDemoData()

const paidThisMonth = computed(() =>
  invoices.value
    .filter(invoice => invoice.status === 'Paid')
    .reduce((total, invoice) => total + invoice.amount, 0)
)

const outstanding = computed(() =>
  invoices.value.reduce((total, invoice) => total + invoice.balance, 0)
)

const acceptedQuotes = computed(() =>
  quotes.value.filter(quote => quote.status === 'Accepted').length
)
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Good morning, Daniel 👋</h1>
        <p class="mt-1 text-slate-500">Here’s what’s happening with Coastal Electrical today.</p>
      </div>

      <NuxtLink to="/quotes" class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm">
        Create Quote
      </NuxtLink>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AppStatCard label="Paid This Month" :value="currency(paidThisMonth)" helper="↑ 22% vs last month" tone="green" />
      <AppStatCard label="Outstanding" :value="currency(outstanding)" helper="Needs follow-up" tone="blue" />
      <AppStatCard label="Accepted Quotes" :value="acceptedQuotes" helper="Ready to invoice" tone="purple" />
      <AppStatCard label="Jobs This Week" value="12" helper="4 scheduled today" tone="orange" />
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <AppSectionCard>
        <div class="border-b border-slate-100 p-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-semibold">Cashflow Overview</h2>
              <p class="text-sm text-slate-500">Simple placeholder chart for MVP</p>
            </div>
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Last 30 days</span>
          </div>
        </div>

        <div class="p-5">
          <div class="flex h-72 items-end gap-3">
            <div v-for="height in [35, 48, 42, 60, 58, 75, 66, 88, 74, 95]" :key="height" class="flex-1 rounded-t-2xl bg-slate-900/80" :style="{ height: `${height}%` }" />
          </div>
        </div>
      </AppSectionCard>

      <AppSectionCard>
        <div class="border-b border-slate-100 p-5">
          <h2 class="font-semibold">Upcoming Jobs</h2>
          <p class="text-sm text-slate-500">Today and this week</p>
        </div>

        <div class="space-y-3 p-5">
          <div v-for="job in ['Smith Residence – Rewire', 'Jones Office Fitout', 'Brown – Switchboard Upgrade','tester','tester']" :key="job" class="rounded-2xl border border-slate-100 p-4">
            <div class="font-medium">{{ job }}</div>
            <div class="mt-1 text-sm text-slate-500">8:00 am – 12:00 pm</div>
          </div>
        </div>
      </AppSectionCard>
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-2">
      <AppSectionCard>
        <div class="border-b border-slate-100 p-5">
          <h2 class="font-semibold">Recent Quotes</h2>
        </div>

        <div class="divide-y divide-slate-100">
          <div v-for="quote in quotes" :key="quote.id" class="flex items-center justify-between p-5">
            <div>
              <div class="font-medium">{{ quote.customer }}</div>
              <div class="text-sm text-slate-500">{{ quote.id }} · {{ quote.jobType }}</div>
            </div>
            <div class="text-right">
              <div class="font-semibold">{{ currency(quote.value) }}</div>
              <AppStatusBadge :status="quote.status" />
            </div>
          </div>
        </div>
      </AppSectionCard>

      <AppSectionCard>
        <div class="border-b border-slate-100 p-5">
          <h2 class="font-semibold">Recent Invoices</h2>
        </div>

        <div class="divide-y divide-slate-100">
          <div v-for="invoice in invoices" :key="invoice.id" class="flex items-center justify-between p-5">
            <div>
              <div class="font-medium">{{ invoice.customer }}</div>
              <div class="text-sm text-slate-500">{{ invoice.id }} · Due {{ invoice.dueDate }}</div>
            </div>
            <div class="text-right">
              <div class="font-semibold">{{ currency(invoice.amount) }}</div>
              <AppStatusBadge :status="invoice.status" />
            </div>
          </div>
        </div>
      </AppSectionCard>
    </div>
  </div>
</template>