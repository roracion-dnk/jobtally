<script setup lang="ts">
import type { Invoice } from '~/composables/useDemoData'

const { invoices, currency } = useDemoData()

const selectedInvoice = ref<Invoice>(invoices.value[0])
const activeStatus = ref('All')
const statuses = ['All', 'Draft', 'Sent', 'Partial', 'Paid', 'Overdue']

const filteredInvoices = computed(() => {
  if (activeStatus.value === 'All') return invoices.value
  return invoices.value.filter(invoice => invoice.status === activeStatus.value)
})

const paidTotal = computed(() =>
  invoices.value.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0)
)

const outstandingTotal = computed(() =>
  invoices.value.reduce((sum, i) => sum + i.balance, 0)
)

const overdueTotal = computed(() =>
  invoices.value.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.balance, 0)
)

const recordPayment = () => {
  const invoice = invoices.value.find(i => i.id === selectedInvoice.value.id)
  if (!invoice) return

  invoice.balance = 0
  invoice.status = 'Paid'
  selectedInvoice.value = invoice
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Invoices</h1>
        <p class="mt-1 text-slate-500">Create, send and manage your invoices.</p>
      </div>

      <button class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm">
        New Invoice
      </button>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AppStatCard label="Paid This Month" :value="currency(paidTotal)" helper="↑ 22% vs last month" tone="green" />
      <AppStatCard label="Outstanding" :value="currency(outstandingTotal)" helper="Needs follow-up" tone="blue" />
      <AppStatCard label="Overdue" :value="currency(overdueTotal)" helper="Follow up today" tone="orange" />
      <AppStatCard label="Draft / Sent" value="6" helper="Ready to send" tone="purple" />
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

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
      <AppSectionCard class="overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="px-5 py-4">Invoice #</th>
                <th class="px-5 py-4">Customer</th>
                <th class="px-5 py-4">Due Date</th>
                <th class="px-5 py-4 text-right">Amount</th>
                <th class="px-5 py-4 text-right">Balance</th>
                <th class="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="invoice in filteredInvoices"
                :key="invoice.id"
                class="cursor-pointer hover:bg-slate-50"
                :class="selectedInvoice.id === invoice.id ? 'bg-blue-50/60' : ''"
                @click="selectedInvoice = invoice"
              >
                <td class="px-5 py-4 font-semibold text-blue-700">{{ invoice.id }}</td>
                <td class="px-5 py-4 font-medium">{{ invoice.customer }}</td>
                <td class="px-5 py-4">{{ invoice.dueDate }}</td>
                <td class="px-5 py-4 text-right font-semibold">{{ currency(invoice.amount) }}</td>
                <td class="px-5 py-4 text-right">{{ currency(invoice.balance) }}</td>
                <td class="px-5 py-4"><AppStatusBadge :status="invoice.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppSectionCard>

      <AppSectionCard>
        <div class="border-b border-slate-100 p-5">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-bold">{{ selectedInvoice.id }}</h2>
              <p class="mt-1 text-sm text-slate-500">Tax Invoice</p>
            </div>
            <AppStatusBadge :status="selectedInvoice.status" />
          </div>
        </div>

        <div class="space-y-6 p-5">
          <div>
            <p class="text-sm text-slate-500">Bill To</p>
            <p class="mt-1 font-semibold">{{ selectedInvoice.customer }}</p>
            <p class="text-sm text-slate-500">Gold Coast, QLD</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm text-slate-500">Amount</p>
              <p class="mt-1 text-xl font-bold">{{ currency(selectedInvoice.amount) }}</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm text-slate-500">Balance</p>
              <p class="mt-1 text-xl font-bold">{{ currency(selectedInvoice.balance) }}</p>
            </div>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4">
            <h3 class="font-semibold">Payment History</h3>
            <p class="mt-2 text-sm text-slate-500">
              MVP placeholder. Later this will connect to payments table.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <button class="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white" @click="recordPayment">
              Record Payment
            </button>
            <button class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold">Send Reminder</button>
            <button class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold">Download PDF</button>
            <button class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold">Edit Invoice</button>
          </div>
        </div>
      </AppSectionCard>
    </div>
  </div>
</template>