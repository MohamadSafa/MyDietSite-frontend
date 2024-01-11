import axios from "axios";

export const addOrder = async (userId, products, OrderId, status) => {
  const newOrder = {
    userId,
    products,
    OrderId,
    status
  };
  try {
    const response = await axios.post(`https://paw-sitive.onrender.com/orders/add`, newOrder);
    return response.data.order;
  } catch (error) {
    console.log("Failed to add an order :", error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get("https://paw-sitive.onrender.com/orders/getAll");
    return response.data.orders;
  } catch (error) {
    console.log("Failed to fetch data :", error);
    throw error;
  }
};

export const deleteOrder = async (Id) => {
  try {
    await axios.delete(`https://paw-sitive.onrender.com/orders/deleteOrder/${Id}`);
    return Id;
  } catch (error) {
    console.log("Failed to delete the order :", error);
    throw error;
  }
};

export const updateOrder = async (Id, userId, products, OrderId, status) => {
  const updatedOrder = {
    userId,
    products,
    OrderId,
    status
  };
  try {
    const response = await axios.put(`https://paw-sitive.onrender.com/orders/updateOrder/${Id}`, updatedOrder);
    return { Id, order: response.data.order };
  } catch (error) {
    console.log("Failed to update the order :", error);
    throw error;
  }
};

export const updateStatus = async (Id) => {
  try {
    const response = await axios.put(`https://paw-sitive.onrender.com/orders/updateStatus/${Id}`);
    return { Id, order: response.data.order };
  } catch (error) {
    console.log("Failed to update the order's status :", error);
    throw error;
  }
};
