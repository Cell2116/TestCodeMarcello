<template>
  <header>
    <div class="title">
      <h1>View Data</h1>
    </div>
    <div class="content">
      <table class="table-container">  
      <thead>
        <tr id="header">
          <th>ID</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Amount</th>
          <th>Customer Name</th>
          <th>Status</th>
          <th>Transaction Date</th>
          <th>Create By</th>
          <th>Create On</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemData" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.productid }}</td>
          <td>{{ item.productname }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.customername }}</td>
          <td>{{ item.status === 0 ? 'SUCCESS' : 'FAILED' }}</td>
          <td>{{ item.transactiondate }}</td>
          <td>{{ item.createby }}</td>
          <td>{{ item.createon }}</td>
          <td>
            <RouterLink :to="{name: 'editData', params: { id: item.id } }">edit</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const itemData = ref([])

const year = route.params.year
const month = route.params.month

async function fetchData() {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/detail/${year}/${month}`)
    if (!response.ok) throw new Error('API failed')
    const data = await response.json()
    itemData.value = data
  } catch (error) {
    console.warn('API fetch failed, fallback to local JSON', error)
    const localResponse = await fetch('../../public/viewData.json')
    const localData = await localResponse.json()
    itemData.value = filterLocalData(localData.data, year, month)
  }
}

function filterLocalData(data, year, month) {
  return data.filter(item => {
    const date = new Date(item.transactionDate)
    return (
      date.getFullYear() === Number(year) &&
      date.getMonth() + 1 === Number(month) // getMonth() mulai dari 0
    )
  })
}

onMounted(fetchData);
</script>



<style scoped>

.title {
  text-align: center;
  margin: 1em 0;
}
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
#header{
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: hsla(160, 100%, 37%, 0.7);
}

.table-container {
  width: 100%;
  margin: 2em 0;
  border-collapse: collapse;
  color: black;
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
