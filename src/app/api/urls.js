// const url = `http://localhost:1337/api`;
// export const PropsUrl = `http://localhost:1337`;
// const url = `https://funny-harmony-ea89b56a43.strapiapp.com/api`;
// export const PropsUrl = `https://funny-harmony-ea89b56a43.strapiapp.com`;

import axios from "axios";
const api_token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/api";

export const axiosClient = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${api_token}`,
    "Content-Type": "application/json",
  },
});
