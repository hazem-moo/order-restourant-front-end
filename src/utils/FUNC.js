import { axiosClient } from "./urls";

export const GetMenu = async () => {
  try {
    const req = await axiosClient.get(`/menus?populate=*`);
    return req.data.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getOrder = async () => {
  try {
    const req = await axiosClient.get(`/orders?populate=*`);
    return req.data.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const postMenu = async (item) => {
  try {
    const res = await axiosClient.post(`/orders`, { data: item });
    return res.data.data;
  } catch (error) {
    console.error(error.message);
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
