export default [
  {
    path: 'job',
    name: 'DashboardJob',
    component: () => import('@/views/dashboard/JobDashboardView.vue'),
  },
  {
    path: 'company',
    name: 'DashboardCompany',
    component: () => import('@/views/dashboard/CompanyDashboardView.vue'),
  },
  {
    path: 'category',
    name: 'DashboardCategory',
    component: () => import('@/views/dashboard/CategoryDashboardView.vue'),
  },
]
