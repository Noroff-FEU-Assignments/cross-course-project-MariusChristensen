import { jackets } from "./components/jackets.js";

function lsGetObject(key) {
  const obj = localStorage.getItem(key);
  return obj && JSON.parse(obj);
}

function lsSetObject(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function addItemToCart(item) {
  const items = lsGetObject("cart") || [];
  items.push(item);
  lsSetObject("cart", items);
}

function removeItemFromCart(item) {
  const items = lsGetObject("cart") || [];
  items.filter((i) => i.id === item.id);
  lsSetObject("cart", items);
}

function clearCart() {
  lsSetObject("cart", []);
}

const cart = document.querySelector(".cart");
const openCart = document.querySelector(".open-cart");
const buyBtn = document.querySelector("#buy-btn");

if (buyBtn) {
  buyBtn.addEventListener("click", (event) => {
    const id = Number(event.target.dataset.productId);
    const jacket = jackets.find((jacket) => jacket.id === id);
    if (jacket !== null) {
      addItemToCart(jacket);
    }
  });
}

openCart.addEventListener("click", () => {
  const cartItems = lsGetObject("cart") || [];
  if (cartItems.length === 0) {
    createEmptyCartHTML();
  } else {
    createCartHTML(cartItems);
  }
  cart.showModal();
});

window.onclick = function (event) {
  if (event.target === cart) {
    cart.close();
    clearCart();
  }
};

function createEmptyCartHTML() {
  cart.innerHTML = `
    <div>Nothing to see here</div>
  `;
}

function createCartHTML(cartItems = []) {
  cart.innerHTML = `
    <div>
      <div>
        <h1>Checkout</h1>
      </div>
      <div class="checkout-info">
        ${cartItems.map(
          (item) => `
          <img src="${item.image}" />
          <p>${item.name}</p>
          <p>${item.price}</p>
        `
        )}
      </div>
      <div>
        <form class="general-form" action="form-success.php" method="post">
          <label>Name:</label>
          <input type="text" name="name" />
          <label>Email:</label>
          <input type="email" name="email" />
          <label>Address:</label>
          <input type="text" name="address" />
          <label>Postal Code:</label>
          <input type="number" name="postal-code" />
          <label>Country:</label>
          <input type="Text" name="country" />
          <div class="payment">
            <div>
              <label for="visa/mastercard">Visa/Mastercard</label>
              <input type="radio" name="payment-method" id="visa/mastercard" />
            </div>
            <div>
              <label for="paypal">Paypal</label>
              <input type="radio" name="payment-method" id="paypal" />
            </div>
            <div>
              <label for="carrier-pigeon">Carrier-pigeon</label>
              <input type="radio" name="payment-method" id="carrier-pigeon" />
            </div>
          </div>
          <label>Name On Card:</label>
          <input type="text" name="name" />
          <label>Expiry Date:</label>
          <input type="number" name="expiry-date" />
          <label>CVC:</label>
          <input type="number" name="cvc" />
          <label>Card Number:</label>
          <input type="number" name="card-number" />
        </form>
        <a href="/checkout-success.html">
          <input
            class="button cta-button cta-button-small cta-contact"
            type="submit"
            value="Purchase"
          />
        </a>
      </div>
    </div>`;
}
