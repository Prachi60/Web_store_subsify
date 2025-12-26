import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCartItems, setCartProductIds } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import Image from "../../assets/category1.png";
import Card from "../../assets/category2.png";
import Card1 from "../../assets/category3.png";
import Banner1 from "../../../src/assets/Banner 1.jpg";
import Banner2 from "../../../src/assets/Banner 2.jpg";
import ProductCard from "../../Component/Card/Card";

const Home = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/product`
        );
        setProduct(res?.data?.result.products || []);
      } catch (error) {
        console.log("Error in fetching products", error);
      }
    };

    fetchProduct();
  }, []);
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getcartitem`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const ids = res.data.result.cart.map((item) => item.product._id);
      dispatch(setCartProductIds(ids));
      dispatch(setCartItems(res.data.result.cart.product));
    };

    fetchCart();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <img
              src={Banner1}
              className="d-block w-100"
              alt="Banner 1"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div
              className="carousel-caption d-block text-dark"
              style={{ bottom: "150px" }}
            >
              <h1>Life Runs Smooth.... When You Subsify</h1>
              <small>
                Daily groceries, milk, veggies & more… always on time
              </small>
            </div>
          </div>
          <div className="carousel-item position-relative">
            <img
              src={Banner2}
              className="d-block w-100"
              alt="Banner 2"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div
              className="carousel-caption d-block text-dark text-start"
              style={{ top: "150px" }}
            >
              <h1>Daily groceries, milk,</h1>
              <h1>veggies & more… always on time!</h1>
              <small>
                Automate your daily routine with smart subscriptions
              </small>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          <div className="col">
            <div className="card border-0 position-relative overflow-hidden">
              <img
                src={Image}
                className="img-fluid"
                alt="Everyday Fresh"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div
                className="position-absolute p-3"
                style={{ top: "60px", left: "30px" }}
              >
                <h5>Everyday Fresh &</h5>
                <h5>Clean With Our</h5>
                <h5>Products</h5>
              </div>
              <div
                className="position-absolute"
                style={{ bottom: "50px", left: "30px" }}
              >
                <Link to="/product" className="btn btn-danger btn-sm">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0 position-relative overflow-hidden">
              <img
                src={Card}
                className="img-fluid"
                alt="Healthy Breakfast"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div
                className="position-absolute p-3"
                style={{ top: "60px", left: "30px" }}
              >
                <h5>Make Your Breakfast</h5>
                <h5>Healthy and Easy</h5>
              </div>
              <div
                className="position-absolute"
                style={{ bottom: "50px", left: "30px" }}
              >
                <Link to="/product" className="btn btn-danger btn-sm">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0 position-relative overflow-hidden">
              <img
                src={Card1}
                className="img-fluid"
                alt="Organic Products"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div
                className="position-absolute p-3"
                style={{ top: "60px", left: "30px" }}
              >
                <h5>The best Organic</h5>
                <h5>Products Online</h5>
              </div>
              <div
                className="position-absolute"
                style={{ bottom: "50px", left: "30px" }}
              >
                <Link to="/product" className="btn btn-danger btn-sm">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Our Products</h2>
          <button
            className="btn btn-danger"
            onClick={() => navigate("/product")}
          >
            View All
          </button>
        </div>
        <div className="row row-cols-xs-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
          {(product || []).slice(0, 10).map((item) => (
            <div className="col" key={item._id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
