<template>
  <Layout>
    <div class="row">
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="text-primary mb-0">Weekly Traffic</h5>
            <select
              v-model="lineChartPeriod"
              @change="updateLineChart"
              class="form-control form-control-sm"
              style="width: 120px"
            >
              <option v-for="option in periodOptions" :value="option" :key="'line-' + option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="card-body">
            <canvas ref="lineChart"></canvas>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="text-success mb-0">User Activity</h5>
            <select
              v-model="barChartPeriod"
              @change="updateBarChart"
              class="form-control form-control-sm"
              style="width: 120px"
            >
              <option v-for="option in periodOptions" :value="option" :key="'bar-' + option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="card-body">
            <canvas ref="barChart"></canvas>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between">
              <span class="text-muted">Total users: {{ getTotalUsers(barChartPeriod) }}</span>
              <span class="text-success">
                <i class="fas fa-arrow-up me-2"></i>
                {{ getGrowthRate(barChartPeriod) }}% from last period</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="text-info mb-0">Traffic Sources</h5>
            <select
              v-model="doughnutChartPeriod"
              @change="updateDoughnutChart"
              class="form-control form-control-sm"
              style="width: 120px"
            >
              <option v-for="option in periodOptions" :value="option" :key="'doughnut-' + option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="card-body">
            <canvas ref="doughnutChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '@/ui/Sidenav.vue'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Chart from 'chart.js/auto'
import { debounce } from 'lodash'

const lineChart = ref(null)
const barChart = ref(null)
const doughnutChart = ref(null)

const lineChartInstance = ref(null)
const barChartInstance = ref(null)
const doughnutChartInstance = ref(null)

const lineChartPeriod = ref('This week')
const barChartPeriod = ref('This month')
const doughnutChartPeriod = ref('This year')

const periodOptions = [
  'This week',
  'Last week',
  'This month',
  'Last month',
  'This year',
  'Last year',
]

const generateChartData = (period, type) => {
  const baseValues = {
    'This week': [30, 40, 35, 50, 45, 40, 35],
    'Last week': [25, 35, 30, 45, 40, 35, 30],
    'This month': [120, 140, 130, 150, 145, 160],
    'Last month': [110, 130, 120, 140, 135, 150],
    'This year': [35, 20, 15, 15, 15],
    'Last year': [30, 25, 20, 15, 10],
  }

  if (type === 'bar') {
    return baseValues[period]?.map((val) => val * 100) || [100, 200, 300, 400, 500]
  }
  if (type === 'line') {
    return baseValues[period] || [30, 40, 35, 50, 45, 40, 35]
  }
  if (type === 'doughnut') {
    return baseValues[period]?.slice(0, 5) || [35, 20, 15, 15, 15]
  }
  return [85, 90, 70, 75, 80, 95]
}

const getTotalUsers = (period) => {
  const totals = {
    'This week': '1,234',
    'Last week': '1,150',
    'This month': '5,280',
    'Last month': '4,950',
    'This year': '32,500',
    'Last year': '28,700',
  }
  return totals[period] || '1,234'
}

const getGrowthRate = (period) => {
  const rates = {
    'This week': 7.3,
    'Last week': 5.2,
    'This month': 6.7,
    'Last month': 5.8,
    'This year': 13.2,
    'Last year': 8.5,
  }
  return rates[period] || 5.0
}

const createLineChart = () => {
  if (lineChartInstance.value) lineChartInstance.value.destroy()

  lineChartInstance.value = new Chart(lineChart.value, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Traffic',
          data: generateChartData(lineChartPeriod.value, 'line').map(
            (each) => each * Math.floor(Math.random() * 20 + 1),
          ),
          borderColor: 'rgba(66,133,244,1)',
          // backgroundColor: 'rgba(66, 133, 244, 0.1)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: getCommonOptions('Daily traffic'),
  })
}

const createBarChart = () => {
  if (barChartInstance.value) barChartInstance.value.destroy()

  barChartInstance.value = new Chart(barChart.value, {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [
        {
          label: 'Active Users',
          data: generateChartData(barChartPeriod.value, 'bar'),
          backgroundColor: 'rgba(117,169,255,0.6)',
          borderColor: 'transparent',
          borderWidth: 1,
        },
        {
          label: 'New Users',
          data: generateChartData(barChartPeriod.value, 'bar').map((val) => val * 0.7),
          backgroundColor: 'rgba(148,223,215,0.6)',
          borderColor: 'transparent',
          borderWidth: 1,
        },
      ],
    },
    options: getCommonOptions('User activity'),
  })
}

const createDoughnutChart = () => {
  if (doughnutChartInstance.value) doughnutChartInstance.value.destroy()

  doughnutChartInstance.value = new Chart(doughnutChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Direct', 'Social', 'Email', 'Referral', 'Organic'],
      datasets: [
        {
          data: generateChartData(doughnutChartPeriod.value, 'doughnut'),
          backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9B72CB'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      ...getCommonOptions('Traffic sources'),
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  })
}

const getCommonOptions = (title) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: !!title,
      text: title,
      font: { size: 14 },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
})

const updateLineChart = () => createLineChart()
const updateBarChart = () => createBarChart()
const updateDoughnutChart = () => createDoughnutChart()

const handleResize = debounce(() => {
  createLineChart()
  createBarChart()
  createDoughnutChart()
}, 100)

const initCharts = () => {
  createLineChart()
  createBarChart()
  createDoughnutChart()
}

const destroyCharts = () => {
  if (lineChartInstance.value) lineChartInstance.value.destroy()
  if (barChartInstance.value) barChartInstance.value.destroy()
  if (doughnutChartInstance.value) doughnutChartInstance.value.destroy()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  destroyCharts()
  window.removeEventListener('resize', handleResize)
})
</script>
