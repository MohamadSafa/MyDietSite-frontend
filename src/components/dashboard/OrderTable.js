import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  //   const [venues, setVenues] = useState([]);
  //   const [venueID, setVenueID] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const validateInput = () => {
    if (!totalQuantity || !totalPrice || !payment || !orderStatus) {
      setError("all fields are required >:( ");
      return false;
    }

    return true;
  };

  const fetchOrders = async () => {
    axios
      .get("https://paw-sitive.onrender.com/orders/getAll")
      .then((response) => {
        console.log(response);
        setOrders(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const fetchProducts = async () => {
    axios
      .get("https://paw-sitive.onrender.com/products/getAll")
      .then((response) => {
        console.log(response);
        setProducts(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleAddOrder = async () => {
    if (!validateInput()) return;

    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.post(
        "https://paw-sitive.onrender.com/orders/add",
        { totalQuantity, totalPrice, payment, orderStatus },
        { headers }
      );

      setShowAddModal(false);
      fetchOrders();
    } catch (error) {
      setError(error);
    }
  };

  const handelUpdateOrderClickButton = (order) => {
    setShowUpdateModal(true);
    setSelectedOrder(order);
    setTotalQuantity(order.totalQuantity);
    setTotalPrice(order.totalPrice);
    setPayment(order.payment);
    setOrderStatus(order.orderStatus);
    setProducts(order.products);
  };

  const handleUpdateOrder = async () => {
    if (!validateInput) return;
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put(
        `https://paw-sitive.onrender.com/orders/update/${selectedOrder.ID}`,
        { totalQuantity, totalPrice, payment, orderStatus },
        { headers }
      );

      setShowUpdateModal(false);
      fetchOrders();
    } catch (error) {
      setError(error);
    }
  };
  const handleDeleteOrder = async (orderID) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(
        `https://paw-sitive.onrender.com/orders/delete/${orderID}`,
        {
          headers,
        }
      );

      fetchOrders();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="card-main">
      <h1 className="dashboard-title"> Orders Table </h1>
      {error && <p className="error-message">{error.message}</p>}

      <button
        className="button button-primary"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        Add Order
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER ID</th>
            <th>Total Quantity</th>
            <th>Total Price</th>
            <th>Payment</th>
            <th>Product ID</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{order.totalQuantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.payment}</td>
              <td>{order.products[0].productId}</td>
              <td>{order.orderStatus}</td>
              <td>
                <button
                  className="button button-primary"
                  onClick={() => {
                    handelUpdateOrderClickButton(order);
                  }}
                >
                  Update
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    handleDeleteOrder(order.ID);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setShowAddModal(false);
              }}
            >
              &times;
            </span>
            <h2>Add New Order</h2>
            {error && <p className="error-message">{error.message}</p>}

            <div className="form-input">
              <input
                type="text"
                value={totalQuantity}
                placeholder="Total Quantity"
                onChange={(e) => {
                  setTotalQuantity(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={totalPrice}
                placeholder="Total Price"
                onChange={(e) => {
                  setTotalPrice(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <textarea
                value={payment}
                placeholder="Payment"
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <textarea
                value={orderStatus}
                placeholder="Order Status"
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <select
                value={products}
                onChange={(e) => {
                  setProducts(e.target.value);
                }}
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.ID} value={product.ID}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="button button-primary" onClick={handleAddOrder}>
              Add Order
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            >
              &times;
            </span>
            <h2>Update Order</h2>
            {error && <p className="error-message">{error.message}</p>}

            <div className="form-input">
              <input
                type="text"
                value={totalQuantity}
                placeholder="Total Quantity"
                onChange={(e) => {
                  setTotalQuantity(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={totalPrice}
                placeholder="Total Price"
                onChange={(e) => {
                  setTotalPrice(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <textarea
                value={payment}
                placeholder="Payment"
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <textarea
                value={orderStatus}
                placeholder="Order Status"
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <select
                value={products}
                onChange={(e) => {
                  setProducts(e.target.value);
                }}
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.ID} value={product.ID}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="button button-primary"
              onClick={handleUpdateOrder}
            >
              Update Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
