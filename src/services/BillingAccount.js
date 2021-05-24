import axios from "axios";

const apiUrl = "http://localhost:3000/billingAccount";

export function getAllBillingAccounts() {
  return axios.get(apiUrl).then((res) => res.data);
}

export function deleteBillingAccount(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export function getBillingAccount(id) {
  return axios.get(`${apiUrl}/${id}`).then((res) => res.data);
}

export function createBillingAccount(billing) {
  return axios.post(`${apiUrl}`, billing);
}

export function updateBillingAccount(billing) {
  return axios.put(`${apiUrl}/${billing.id}`, billing);
}
