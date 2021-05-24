import * as UserService from "./UserService";
import axios from "axios";

const apiUrl = "http://localhost:3000/games";

export function getAllGames() {
  return axios.get(apiUrl).then((res) => res.data);
}

export async function deleteGame(id) {
  const allUsers = await UserService.getAllUsers();
  allUsers.forEach((user) => {
    const arr = user.games.filter((game) => game.id !== id);
    user.games = arr;
    UserService.updateUser(user, undefined);
  });

  return axios.delete(`${apiUrl}/${id}`);
}

export function update(id, updatedDate) {
  console.log(updatedDate);
  return axios.put(`${apiUrl}/${id}`, updatedDate);
}

export function createGame(game) {
  return axios.post(`${apiUrl}`, game);
}
