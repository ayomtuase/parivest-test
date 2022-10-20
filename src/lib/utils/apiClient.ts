import axios from "axios";

const BASE_URL = "https://parivest-mock-api.herokuapp.com/api/v1";

export const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
});
