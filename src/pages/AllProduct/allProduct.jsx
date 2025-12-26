
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./allProduct.css";
import ProductCard from "../../Component/Card/Card";

const AllProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setSelectedPrices((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  };

  const fetchFilteredData = async (pageNumber = page) => {
    try {
      let query = `search=${searchQuery}&page=${pageNumber}&limit=8`;

      if (selectedCategories.length > 0) {
        query += `&category=${selectedCategories.join(",")}`;
      }
      if (selectedPrices.length > 0) {
        query += `&priceRange=${selectedPrices.join(",")}`;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/product?${query}`
      );

      setProduct(res.data.result.products);
      setTotalPages(res.data.result.totalPages);
      setPage(res.data.result.page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFilteredData(page);
  }, [page, selectedCategories, selectedPrices]);
  useEffect(() => {
  fetchFilteredData(1); 
}, [searchQuery, selectedCategories, selectedPrices]);


  return (
    <div className="container-fluid p-0">

 
      <div className="bg-danger py-3 text-white">
        <div className="container d-flex justify-content-between">
          <span className="fs-5">All Products</span>
          <div className="d-flex gap-2">
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
            <span>-</span>
            <span>All Products</span>
          </div>
        </div>
      </div>


      <div className="container my-5">

     
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>All Products</h2>
          <button
            className="btn btn-danger d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterOffcanvas"
          >
            Filter
          </button>
        </div>

        <div className="row">

         
          <div className="col-lg-3 d-none d-lg-block bg-light p-3 rounded shadow-sm">

          
            <h5>Product Category</h5>
            <hr />
            <div className="form-check mb-2">
              <input
                className="form-check-input bg-secondary"
                type="checkbox"
                onChange={handleCategoryChange}
                value="6944e0b72adf6409332cb399"
              />
              <label className="form-check-label">Food Subscription</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input  bg-secondary"
                type="checkbox"
                onChange={handleCategoryChange}
                value="6943e4b1b2bb6550a5ccdced"
              />
              <label className="form-check-label">Dairy Products</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input  bg-secondary"
                type="checkbox"
                onChange={handleCategoryChange}
                value="6944d5e32adf6409332cb1f2"
              />
              <label className="form-check-label">Home Essentials</label>
            </div>

            
            <h5 className="mt-4">Filter By Price</h5>
            <hr />
            <div className="form-check mb-2">
              <input
                className="form-check-input  bg-secondary"
                type="checkbox"
                onChange={handlePriceChange}
                value="0-300"
              />
              <label className="form-check-label">₹0 - ₹300</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input  bg-secondary"
                type="checkbox"
                onChange={handlePriceChange}
                value="300-500"
              />
              <label className="form-check-label">₹300 - ₹500</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input  bg-secondary"
                type="checkbox"
                onChange={handlePriceChange}
                value="500-1000"
              />
              <label className="form-check-label">₹500 - ₹1000</label>
            </div>
          </div>


          
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="filterOffcanvas"
          >
            <div className="offcanvas-header">
              <h5>Filters</h5>
              <button className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">

             
              <h5>Product Category</h5>
              <hr />
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCategoryChange}
                  value="6927eaeccec64997ea261c85"
                />
                <label className="form-check-label">Food Subscription</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCategoryChange}
                  value="692ff9ee59fa6c580c81812a"
                />
                <label className="form-check-label">Dairy Products</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCategoryChange}
                  value="6927eabbcec64997ea261c6d"
                />
                <label className="form-check-label">Home Essentials</label>
              </div>

           
              <h5 className="mt-4">Filter By Price</h5>
              <hr />

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handlePriceChange}
                  value="0-300"
                />
                <label className="form-check-label">₹0 - ₹300</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handlePriceChange}
                  value="300-500"
                />
                <label className="form-check-label">₹300 - ₹500</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handlePriceChange}
                  value="500-1000"
                />
                <label className="form-check-label">₹500 - ₹1000</label>
              </div>
            </div>
          </div>

   
          <div className="col-lg-9">
          
            {product.length > 0 ? (
  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
    {product.map((item) => (
      <ProductCard product={item} key={item._id} />
    ))}
  </div>
) : (
  <p className="text-center my-5">No products found</p>
)}


            
            <div className="d-flex justify-content-center my-4 gap-2">
              <button
                className="btn btn-outline-secondary"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`btn ${
                    page === i + 1 ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-outline-secondary"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AllProduct;
