
import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_subsify.png";
import { useSelector, useDispatch } from "react-redux";
import { setCartCount} from "../../redux/cartSlice";
import { setWishlistCount } from "../../redux/wishlistSlice";
import Swal from "sweetalert2";
import useDebounce from "../../pages/debounce";
import AuthModal from "../AuthModal";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAuthModal,setShowAuthModal]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState([]);
  const [searchText, setSearchText] = useState("");
  const cartCount = useSelector((state) => state.cart.count);
  const refresh = useSelector((state) => state.cart.refresh);
  const wishlistCount = useSelector((state) => state.wishlist.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedSearchText = useDebounce(searchText, 500);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

   
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("cartItemId_")) {
        localStorage.removeItem(key);
      }
    });

    if (!token) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      dispatch(setCartCount(guest.length));
    } else {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/getcartitem`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const count = res.data.result.cartcount;
          dispatch(setCartCount(count));
        })
        .catch((err) => console.log("Navbar cart error:", err));
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist_ids")) || [];
    dispatch(setWishlistCount(wishlist.length));
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/product`)
      .then((res) => {
        setProduct(res.data.results);
      })
      .catch((err) => console.log("Product fetch error:", err));
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you Sure?",
      text: "You will be logged out from your account",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("wishlist_ids");
        localStorage.removeItem("cart_items");
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("cartItemId_")) {
            localStorage.removeItem(key);
          }
        });
        setIsLoggedIn(false);
        toast.success("Logout Successful");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
  };

useEffect(() => {
  if (debouncedSearchText.trim() !== "") {
    navigate(`/product?search=${debouncedSearchText}`);
  } else {
   
    navigate("/");
  }
}, [debouncedSearchText]);

  return (
    <header className="shadow-sm bg-white sticky-top py-3 mt-1" >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
    
          <Link to="/" className="text-decoration-none text-dark">
            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt="logo"
                width="100"
                height="50"
                className="rounded-circle"
              />
              <div className="ms-2 d-none d-md-block">
                <h5 className="m-0 fw-bold">Daily Refils</h5>
                <small className="text-muted">Start Your Streak</small>
              </div>
            </div>
          </Link>

          
          <div className="d-none d-lg-flex flex-grow-1 mx-4 justify-content-center">
            <div className="input-group w-75 ">
              <input
                type="text"
                className="form-control border-success border-end-0 "
                placeholder="Search for items..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn btn-danger"
                type="button"
               
                onClick={() => {
  if (searchText.trim()) {
    navigate(`/product?search=${searchText}`);
  } else {
    navigate("/product");
  }
}}

              >
                <FaSearch color="#fff" />
              </button>
            </div>
          </div>

        
          <div className="d-lg-none d-flex  ms-auto">
            <button
              className="btn "
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>
          </div>

          
          {showSearch && (
            <div className="d-lg-none w-100 mt-2 position-absolute top-100 start-0 bg-white p-3 shadow">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-success"
                  placeholder="Search for items..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    navigate( `/product?search=${searchText}`);
                    setShowSearch(false);
                  }}
                >
                  <FaSearch color="#fff" />
                </button>
              </div>
            </div>
          )}

       
          <div className="d-flex align-items-center gap-3">
           
            <div className="dropdown">
              <div
                className="d-flex align-items-center gap-1 text-decoration-none text-dark"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser size={18} />
                <span className="d-none d-md-inline">Account</span>
              </div>
              <ul className="dropdown-menu dropdown-menu-end shadow">
               
                {!isLoggedIn && (
                  <li>
                   
                    <button
  className="dropdown-item"
  onClick={() => setShowAuthModal(true)}
>
  Login
</button>
                  </li>
                )}
                
                {isLoggedIn && (
                  <div>
                  <li>
                  <Link className="dropdown-item" to="/myorder">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/changepassword">
                  Manage password
                  </Link>
                </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                  </div>
                )}
              </ul>
            </div>

        
            <Link
              to="/wishlist"
              className="position-relative text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaHeart size={18} />
              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                </span>
              )}
              <span className="d-none d-md-inline">Wishlist</span>
            </Link>

          
            <Link
              to="/cart"
              className="position-relative text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaShoppingCart size={18} />
              <span className="d-none d-md-inline">Cart</span>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      {showAuthModal && (
  <AuthModal
    show={showAuthModal}
    onClose={() => setShowAuthModal(false)}
  />
)}

      
    </header>
  );
};

export default Navbar;
