import Axios from "../utils/axios";

export const apiUploadImage = (data) => Axios.put("/employees/upload", data);

export const apiCreateEmployee = (data) => Axios.post("/employees", data);

export const apiUpdateEmployee = (id, data) =>
  Axios.put(`/employees/${id}`, data);

export const apiDeleteEmployee = (id) => Axios.delete(`/employees/${id}`);

export const apiGetEmployees = (q) =>
  Axios.get("/employees", {
    params: { q },
  });
