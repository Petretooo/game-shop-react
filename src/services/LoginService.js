import axios from "axios";
import * as UserService from "./UserService";

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export async function login(userData) {
  console.log(userData);
  const users = await UserService.getAllUsers();
  const loggedUser = users.find(
    (u) =>
      u.username === userData.username &&
      u.password.toString() === userData.password
  );

  if (loggedUser) {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    return;
  }
}

export function logout() {
  localStorage.removeItem("loggedUser");
}
