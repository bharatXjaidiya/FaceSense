import axios from "axios";

const baseURL = "http://loacalhost:3000";

const api = axios.create({baseURL ,withCredentials : true})

