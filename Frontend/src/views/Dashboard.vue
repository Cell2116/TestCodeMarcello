<template>
  <header>
    <div class="title">
      <h1>Dashboard</h1>
      <nav>
        <RouterLink to="/addData">Add Data</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <div class="content">
      <table class="table-container">
        <thead>
          <tr id="header">
            <th>Number of Data</th>
            <th>Month</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in groupedData" :key="index">
            <td>{{ item.total }}</td>
            <td>{{ getMonthName(item.month) }}</td>
            <td>{{ item.year }}</td>
            <td>
              <RouterLink :to="{ name: 'viewData', params: { year: item.year, month: item.month } }">View</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const groupedData = ref([])

function getMonthName(monthNumber) {
  const date = new Date()
  date.setMonth(monthNumber - 1)
  return date.toLocaleString('default', { month: 'long' })
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/transactions/group')
    console.log(response)
    if (!response.ok) throw new Error('API failed')
    const data = await response.json()
    groupedData.value = data
  } catch (error) {
    console.warn('API fetch failed, fallback to local JSON', error)
    const localResponse = await fetch('../../public/viewData.json')
    const localData = await localResponse.json()
    const grouped = groupLocalData(localData.data)
    groupedData.value = grouped
  }
}

function groupLocalData(data) {
  const groups = {}

  data.forEach(item => {
    const date = new Date(item.transactionDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 

    const key = `${year}-${month}`
    if (!groups[key]) {
      groups[key] = { year, month, total: 0 }
    }
    groups[key].total += 1
  })

  return Object.values(groups)
}

onMounted(fetchData);
</script>

<style scoped>
@media (min-width: 1024px) {
  .content {
    max-height: 80vh;
    display: flex;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  .content::-webkit-scrollbar {
    width: 0;
  }
}

.title {
  text-align: center;
  margin-bottom: 0.8em;
}

.table-container {
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;
  color: black;
}

#header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: hsla(160, 100%, 37%, 0.7);
}

.table-container th,
.table-container td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.table-container th {
  background-color: hsla(160, 100%, 37%, 0.7);
  font-weight: bold;
}

.table-container td {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
