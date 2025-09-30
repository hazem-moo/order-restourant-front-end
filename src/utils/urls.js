import axios from "axios";
// const url = `http://localhost:1337/api`;
// export const PropsUrl = `http://localhost:1337`;
const url = `https://funny-harmony-ea89b56a43.strapiapp.com/api`;
const API_TOCKEN = process.env.NEXT_PUBLIC_TOKEN;
export const PropsUrl = `https://funny-harmony-ea89b56a43.strapiapp.com`;

export const axiosClient = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${API_TOCKEN}`,
    "Content-Type": "application/json",
  },
});
