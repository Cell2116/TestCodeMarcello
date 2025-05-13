<template>
  <div class="form-container">
    <h1>Data Form</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="productID">Product ID</label>
        <input type="text" id="productID" v-model="formData.productID" required />
      </div>
      <div>
        <label for="productName">Product Name</label>
        <input type="text" id="productName" v-model="formData.productName" required />
      </div>
      <div>
        <label for="amount">Amount</label>
        <input type="number" id="amount" v-model="formData.amount" required />
      </div>
      <div>
        <label for="customerName">Customer Name</label>
        <input type="text" id="customerName" v-model="formData.customerName" required />
      </div>
      <div>
        <label for="status">Status</label>
        <select id="status" v-model="formData.status" required>
          <option value="0">SUCCESS</option>
          <option value="1">FAILED</option>
        </select>
      </div>
      <div>
        <label for="transactionDate">Transaction Date</label>
        <div class="button-container">
          <button id="buttonNow" type="button" @click="setCurrentTime">Now</button>
          <input type="datetime-local" id="transactionDate" v-model="formData.transactionDate" />
        </div>
      </div>
      <div>
        <label for="createBy">Created By</label>
        <input type="text" id="createBy" v-model="formData.createBy" placeholder="Enter your name" />
      </div>
      <div>
        <label for="createOn">Create On</label>
        <div class="button-container">
          <button id="buttonNow" type="button" @click="setCreateOn">Now</button>
          <input type="datetime-local" id="createOn" v-model="formData.createOn" />
        </div>
      </div>
      <button id="sub" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const formData = ref({
  productID: '',
  productName: '',
  amount: '',
  customerName: '',
  status: 0,
  transactionDate: '',
  createBy: '',
  createOn: ''
})

// Set current time for transaction date
const setCurrentTime = () => {
  const indonesiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  formData.value.transactionDate = new Date(indonesiaTime).toISOString().slice(0, 16)
}

// Set current time for create on field
const setCreateOn = () => {
  const indonesiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  formData.value.createOn = new Date(indonesiaTime).toISOString().slice(0, 16)
}

// Handle form submission
const submitForm = async () => {
  try {
    const { id, ...dataWithoutId } = formData.value; // Exclude the id field
    const response = await axios.post('http://localhost:3000/api/transactions/addData', dataWithoutId);
    alert('Data submitted successfully');
  } catch (error) {
    console.error(error);
    alert('Error submitting data');
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
