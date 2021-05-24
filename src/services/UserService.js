import axios from "axios";
import * as BillingAccount from "./BillingAccount";
import * as LoginService from "./LoginService";
import * as GameService from "./GameService";

const apiUrl = "http://localhost:3000/users";

export function getAllUsers() {
  return axios.get(apiUrl).then((res) => res.data);
}

export function deleteUser(id) {
  BillingAccount.deleteBillingAccount(id);
  LoginService.logout();
  return axios.delete(`${apiUrl}/${id}`);
}

export async function updateUser(updatedDate, deposit) {
  localStorage.setItem("loggedUser", JSON.stringify(updatedDate));
  if (deposit !== undefined) {
    await BillingAccount.updateBillingAccount({
      id: updatedDate.id,
      deposit: deposit,
    });
  }
  return axios.put(`${apiUrl}/${updatedDate.id}`, updatedDate);
}

export function getUser(id) {
  return axios.get(`${apiUrl}/${id}`).then((res) => res.data);
}

export async function createUser(user, deposit) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
  await BillingAccount.createBillingAccount({
    id: user.id,
    deposit: deposit,
  });
  return axios.post(`${apiUrl}`, user);
}
