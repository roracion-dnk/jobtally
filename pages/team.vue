<script setup lang="ts">
const { teamUsers } = useDemoData()

const activeTab = ref('All Users')
const tabs = ['All Users', 'Active', 'Pending', 'Inactive']

const filteredUsers = computed(() => {
  if (activeTab.value === 'All Users') return teamUsers.value
  return teamUsers.value.filter(user => user.status === activeTab.value)
})
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Team & Permissions</h1>
        <p class="mt-1 text-slate-500">Manage your team members, roles and access permissions.</p>
      </div>

      <button class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm">
        Invite User
      </button>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AppStatCard label="Total Users" :value="teamUsers.length" helper="2 new this month" tone="blue" />
      <AppStatCard label="Admins" value="2" helper="Owner + admin" tone="green" />
      <AppStatCard label="Active Users" :value="teamUsers.filter(u => u.status === 'Active').length" helper="Logged in recently" tone="purple" />
      <AppStatCard label="Pending Invites" :value="teamUsers.filter(u => u.status === 'Pending').length" helper="Awaiting response" tone="orange" />
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <AppSectionCard class="overflow-hidden">
        <div class="border-b border-slate-100 p-5">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tab in tabs"
                :key="tab"
                class="rounded-full px-4 py-2 text-sm font-medium"
                :class="activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>

            <input class="rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none" placeholder="Search users...">
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="px-5 py-4">User</th>
                <th class="px-5 py-4">Role</th>
                <th class="px-5 py-4">Email</th>
                <th class="px-5 py-4">Phone</th>
                <th class="px-5 py-4">Last Active</th>
                <th class="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="px-5 py-4">
                  <div class="font-semibold">{{ user.name }}</div>
                  <div class="text-xs text-slate-500">Coastal Electrical</div>
                </td>
                <td class="px-5 py-4">{{ user.role }}</td>
                <td class="px-5 py-4 text-slate-600">{{ user.email }}</td>
                <td class="px-5 py-4">{{ user.phone }}</td>
                <td class="px-5 py-4">{{ user.lastActive }}</td>
                <td class="px-5 py-4"><AppStatusBadge :status="user.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppSectionCard>

      <div class="space-y-6">
        <AppSectionCard>
          <div class="border-b border-slate-100 p-5">
            <h2 class="font-semibold">Role Permissions</h2>
            <p class="text-sm text-slate-500">Manager access preview</p>
          </div>

          <div class="space-y-3 p-5 text-sm">
            <div v-for="permission in ['View all jobs, quotes and invoices', 'Create and edit records', 'Manage customers', 'Assign jobs and tasks', 'View reports']" :key="permission" class="flex items-center gap-3">
              <span class="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-xs text-emerald-700">✓</span>
              <span>{{ permission }}</span>
            </div>
          </div>
        </AppSectionCard>

        <AppSectionCard>
          <div class="border-b border-slate-100 p-5">
            <h2 class="font-semibold">Recent Activity</h2>
          </div>

          <div class="space-y-4 p-5 text-sm">
            <p><strong>Sarah Thompson</strong> updated Liam’s role.</p>
            <p><strong>Daniel Roberts</strong> invited Jack Reynolds.</p>
            <p><strong>Michael Johnson</strong> logged in today.</p>
          </div>
        </AppSectionCard>
      </div>
    </div>
  </div>
</template>