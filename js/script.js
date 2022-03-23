const cart = document.querySelector(".cart");
const openCart = document.querySelector(".open-cart");

openCart.addEventListener("click", () => {
  cart.showModal();
});
