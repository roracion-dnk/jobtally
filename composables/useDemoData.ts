export type QuoteStatus = 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected'
export type InvoiceStatus = 'Draft' | 'Sent' | 'Partial' | 'Paid' | 'Overdue'
export type UserStatus = 'Active' | 'Pending' | 'Inactive'

export interface Quote {
  id: string
  customer: string
  location: string
  jobType: string
  issueDate: string
  expiry: string
  value: number
  status: QuoteStatus
}

export interface Invoice {
  id: string
  customer: string
  dueDate: string
  amount: number
  balance: number
  status: InvoiceStatus
}

export interface TeamUser {
  id: number
  name: string
  role: string
  email: string
  phone: string
  lastActive: string
  status: UserStatus
}

export const useDemoData = () => {
  const quotes = useState<Quote[]>('quotes', () => [
    { id: 'Q-1048', customer: 'Michael Johnson', location: 'Burleigh Heads, QLD', jobType: 'Switchboard upgrade', issueDate: '15 May 2025', expiry: '14 Jun 2025', value: 2850, status: 'Sent' },
    { id: 'Q-1047', customer: 'Sarah Thompson', location: 'Southport, QLD', jobType: 'Lighting installation', issueDate: '13 May 2025', expiry: '12 Jun 2025', value: 1950, status: 'Viewed' },
    { id: 'Q-1046', customer: 'Coastal Café', location: 'Mermaid Beach, QLD', jobType: 'Power points', issueDate: '12 May 2025', expiry: '11 Jun 2025', value: 3600, status: 'Draft' },
    { id: 'Q-1045', customer: 'David Brown', location: 'Miami, QLD', jobType: 'Switchboard upgrade', issueDate: '11 May 2025', expiry: '10 Jun 2025', value: 4750, status: 'Accepted' }
  ])

  const invoices = useState<Invoice[]>('invoices', () => [
    { id: 'INV-2109', customer: 'Smith Residence', dueDate: '25 May 2025', amount: 2850, balance: 0, status: 'Paid' },
    { id: 'INV-2108', customer: 'ABC Builders', dueDate: '28 May 2025', amount: 5400, balance: 2700, status: 'Partial' },
    { id: 'INV-2107', customer: 'Jones Office Fitout', dueDate: '22 May 2025', amount: 4950, balance: 0, status: 'Paid' },
    { id: 'INV-2106', customer: 'Coastal Café', dueDate: '15 May 2025', amount: 3600, balance: 1600, status: 'Overdue' }
  ])

  const teamUsers = useState<TeamUser[]>('teamUsers', () => [
    { id: 1, name: 'Daniel Roberts', role: 'Owner', email: 'daniel@coastalelectrical.com.au', phone: '0412 345 678', lastActive: 'Today, 8:42 am', status: 'Active' },
    { id: 2, name: 'Sarah Thompson', role: 'Admin', email: 'sarah@coastalelectrical.com.au', phone: '0433 987 654', lastActive: 'Today, 7:15 am', status: 'Active' },
    { id: 3, name: 'Michael Johnson', role: 'Manager', email: 'michael.j@coastalelectrical.com.au', phone: '0401 234 567', lastActive: 'Today, 6:58 am', status: 'Active' },
    { id: 4, name: 'Jack Reynolds', role: 'Apprentice', email: 'jack@coastalelectrical.com.au', phone: '0437 333 888', lastActive: '—', status: 'Pending' }
  ])

  const currency = (amount: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)

  return {
    quotes,
    invoices,
    teamUsers,
    currency
  }
}