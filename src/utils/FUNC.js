import { axiosClient } from "./urls";

export const GetMenu = async () => {
  console.log("🌍 STRAPI URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
  console.log(
    "🔑 TOKEN:",
    process.env.NEXT_PUBLIC_STRAPI_TOKEN?.slice(0, 10) + "..."
  );
  try {
    const req = await axiosClient.get(`/menus?populate=*`);
    return req.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOrder = async () => {
  try {
    const req = await axiosClient.get(`/orders?populate=*`);
    return req.data.data;
  } catch (error) {
    console.error("❌ Request failed:", error.response?.data || error.message);
  }
};

export const postMenu = async (item) => {
  try {
    // console.log("📦 SENDING ITEM:", item);
    const res = await axiosClient.post(`/orders`, item);
    return res.data.data;
  } catch (error) {
    console.error("❌ Request failed:", error.response?.data || error.message);
    console.error("🔍 Full error:", error);
  }
};

export const deleteMenu = async (id) => {
  try {
    const res = await axiosClient.delete(`/orders/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error.message);
  }
};
