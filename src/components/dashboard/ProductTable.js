import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products/getAll")
      .then((response) => {
        console.log(response);
        setProducts(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleDeleteProduct = async (productID) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/delete/${productID}`,
        {
          headers,
        }
      );
      console.log(response);
      fetchProducts();
    } catch (error) {
      setError(error);
    }
  };

  const handleAddProduct = async () => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productBrand", productBrand);
    formData.append("productImage", productImage);
    formData.append("productDescription", productDescription);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("discountPercentage", discountPercentage);

    try {
      await axios.post(
        "http://localhost:5000/products/add",
        formData,
        {
          headers,
        }
      );

      fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdateProductClickButton = (e,product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setProducts(product.products);
    setProductName(product.productName);
    setProductBrand(product.productBrand);
    setProductImage(product.productImage);
    setProductDescription(product.productDescription);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setDiscountPercentage(product.discountPercentage);
    setShowUpdateModal(true);
  };
  console.log('selectedProduct', selectedProduct)
  const handleUpdateProduct = async (e, selectedProduct) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productBrand", productBrand);
    formData.append("productDescription", productDescription);
    formData.append("image", productImage);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("discountPercentage", discountPercentage);
    try {
      console.log(productName, productBrand, productDescription, productImage, price, category, stock, discountPercentage);
      await axios.put(
        `http://localhost:5000/products/update/${selectedProduct._id}`,
        {formData
          
        },
        {
          headers,
        }
      );

      fetchProducts();
      setError("");
      setShowUpdateModal(false);
    } catch (error) {
      setError(error);
    }
  };

  const [sortOrder, setSortOrder] = useState(true); // true for ascending order , false for descending
  const toggleSort = (field) => {
    const newSortedProducts = [...products].sort((a, b) => {
      // if(a[field]< b[field]) return -1 aw 1 if i want sortOrder true aw false

      if (a[field] < b[field]) return sortOrder ? -1 : 1;

      if (a[field] > b[field]) return sortOrder ? 1 : -1;

      return 0;
    });

    setProducts(newSortedProducts);
    setSortOrder(!sortOrder);
  };

  return (
    <div className="card-main">
      <h1 className="dashboard-title"> Products Table </h1>

      {error && <p className="error-message">{error.message}</p>}

      <button
        className="button button-primary"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        Add product
      </button>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("ID")}>ID</th>
            <th onClick={() => toggleSort("name")}>Product Name</th>
            <th onClick={() => toggleSort("brand")}>Product Brand</th>
            <th>Image</th>
            <th onClick={() => toggleSort("description")}>Description</th>
            <th onClick={() => toggleSort("price")}>Price</th>
            <th onClick={() => toggleSort("category")}>Category</th>
            <th onClick={() => toggleSort("stock")}>Stock</th>
            <th onClick={() => toggleSort("discount")}>Discount percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((product) => (
            <tr className="venue-table" key={product._id}>
              <td>{product._id}</td>
              <td>{product.productName}</td>
              <td>{product.productBrand}</td>
              <td>
                <img src={product.productImage} alt={product.productName} />
              </td>
              <td>{product.productDescription}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.discountPercentage}</td>
              <td>
                <button
                  className="button button-primary"
                  onClick={(e) => {
                    handleUpdateProductClickButton(e,product);
                  }}
                >
                  Update
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    handleDeleteProduct(product._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Venue Modal */}
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
            <h2>Add Product</h2>
            <div className="form-input">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="form-input">
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="form-input">
              <textarea
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="Discount"
              />
            </div>
            <div className="form-input">
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
                placeholder="Brand"
              />
            </div>

            <button
              className="button button-primary"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* Update Venue Modal */}
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
            <h2>Update Product</h2>
            <div className="form-input">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
                placeholder="Product Brand"
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="Discount Percentage"
              />
            </div>
            <div className="form-input">
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="form-input">
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
            </div>

            <button
              className="button button-primary"
              onClick={(e)=>handleUpdateProduct(e,selectedProduct)}
            >
              Update Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
