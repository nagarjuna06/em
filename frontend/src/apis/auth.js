import Axios from "../utils/axios";

export const apiLoginAccount = (data) => Axios.post("/auth/login", data);

export const apiGetSession = () => Axios.get("/auth/session");
