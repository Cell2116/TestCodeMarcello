<template>
  <div class="form-container">
    <h1>Edit Data</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="productID">Product ID</label>
        <input v-model="formData.productid" id="productID" type="text" required />
      </div>
      <div>
        <label for="productName">Product Name</label>
        <input v-model="formData.productname" id="productName" type="text" required />
      </div>
      <div>
        <label for="amount">Amount</label>
        <input v-model="formData.amount" id="amount" type="number" required />
      </div>
      <div>
        <label for="customerName">Customer Name</label>
        <input v-model="formData.customername" id="customerName" type="text" required />
      </div>
      <div>
        <label for="status">Status</label>
        <select v-model="formData.status" id="status" required>
          <option :value="0">SUCCESS</option>
          <option :value="1">FAILED</option>
        </select>
      </div>
      <div>
        <label for="transactionDate">Transaction Date</label>
        <div class="button-container">
          <button id="buttonNow" type="button" @click="setCurrentTime">Now</button>
          <input v-model="formData.transactiondate" id="transactionDate" type="datetime-local" required />
        </div>
      </div>
      <div>
        <label for="createBy">Created By</label>
        <input v-model="formData.createby" id="createBy" type="text" disabled />
      </div>
      <div>
        <label for="createOn">Create On</label>
        <div class="button-container">
          <button id="buttonNow" type="button" @click="setCreateOn">Now</button>
          <input v-model="formData.createon" id="createOn" type="text" disabled />
        </div>
      </div>
      <button id="sub" type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const formData = ref({
  productid: '',
  productname: '',
  amount: '',
  customername: '',
  status: 0,
  transactiondate: '',
  createby: '',
  createon: ''
})

onMounted(async () => {
  const itemId = route.params.id;
  const item = await fetchItemData(itemId);

  // Format dates to match the datetime-local input format
  item.transactiondate = item.transactiondate.slice(0, 16);
  item.createon = item.createon.slice(0, 16);

  formData.value = { ...item }
});


async function fetchItemData(itemId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/transactions/detail/${itemId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching item data:", error)
    return {}
  }
}

// Set current time for transaction date field
const setCurrentTime = () => {
  const indonesiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  const localDate = new Date(indonesiaTime);
  const formattedDate = localDate.toISOString().slice(0, 16);  // Format to yyyy-MM-ddThh:mm
  formData.value.transactionDate = formattedDate;
}

// Set current time for create on field
const setCreateOn = () => {
  const indonesiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  const localDate = new Date(indonesiaTime);
  const formattedDate = localDate.toISOString().slice(0, 16);  // Format to yyyy-MM-ddThh:mm
  formData.value.createOn = formattedDate;
}

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await axios.put(`http://localhost:3000/api/transactions/${route.params.id}`, formData.value)
    console.log(formData.value)
    alert('Data successfully updated')
  } catch (error) {
    console.error(error)
    alert('error updating data')
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 0.8em;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

label {
  margin-bottom: 5px;
  color: black;
}

input,
select {
  margin-bottom: 0.3em;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

#buttonNow {
  background-color: #28a745;
  color: white;
  border: none;
  width: 10%;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.3em;
  margin-right: 0.5em;
}

#buttonNow:hover {
  background-color: #218838;
}

#transactionDate,
#createOn {
  width: 80%;
}

#sub {
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 1em;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
