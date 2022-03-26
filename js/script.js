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

let pendingPurchase = false;

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
  if (!pendingPurchase && event.target === cart) {
    cart.close();
  }

  if (event.target.id === "submit-purchase") {
    pendingPurchase = true;
    event.stopPropagation();
    createLoadingHTML();
    setTimeout(() => {
      pendingPurchase = false;
      const cartItems = lsGetObject("cart") || [];
      clearCart();
      createSuccessHTML(cartItems);
    }, 2000);
  }
};

function createSuccessHTML(cartItems = []) {
  cart.innerHTML = `
      <div>
        <h1>Checkout Success!</h1>
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
        <h2>Thank you for your purchase!</h2>
        <p>We here at RainyDays are certain that you will enjoy your new jacket for years and years to come!</p>
        <p>
          A confirmation email has been sent to Coolerguys@coolmail.com. Another email will be sent when the jacket is <br/>        
          shipped, along with a tracking number so you can sit by the door and wait as soon as it arrives.
        </p>
      </div>`;
}

function createLoadingHTML() {
  cart.innerHTML = `<img src="/images/spinner.gif" />`;
}

function createEmptyCartHTML() {
  cart.innerHTML = `
    <div>
      <h1>Nothing to see here <i class="fa-solid fa-face-frown"></i></h1>
      <p>Press the button below to go to our shop!</p>
      <a class="button cta-button" href="shop.html">Shop</a>
    </div>
  `;
}

function createCartHTML(cartItems = []) {
  const cartSum = cartItems.reduce((sum, item) => sum + item.price, 0);
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
          <p>${item.price}$</p>
        `
        )}
        <div>
        <p>Sum total: ${cartSum.toFixed(2)}$</p>
        </div>
      </div>
      <div>
        <form class="general-form" action="#">
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
        <input
          id="submit-purchase"
          class="button cta-button cta-button-small cta-contact"
          type="submit"
          value="Purchase"
        />
      </div>
    </div>`;
}
