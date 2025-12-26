import axios from "axios";

export const addToCart = async (product) => {
  const token = localStorage.getItem("token");

  if (!token) {
    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const index = guestCart.findIndex((item) => item._id === product._id);

    if (index !== -1) {
      guestCart[index].quantity += 1;
    } else {
      guestCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("guestCart", JSON.stringify(guestCart));
    return { status: "guest", message: "Added to guest cart" };
  }

  return axios
    .post(
      `${import.meta.env.VITE_API_URL}/user/addtocart`,
      {
        product: product._id,
        quantity: 1,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(() => {
      
    });
};
