import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://school-mgt-server.herokuapp.com/",
});
export default instance;

// export function deleteCard(id) {
//   axios.delete({
//     baseURL: `http://localhost:8001/tinder/cards/:${id}`,
//   });
// }
