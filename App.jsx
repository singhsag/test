import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export function App(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products data: ", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="App">
      <h1>Product Information</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.images[0]} alt={product.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
