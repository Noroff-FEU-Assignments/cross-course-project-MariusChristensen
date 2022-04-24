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

const url = "https://mariuschristensen.one/my-first-api/wp-json/wc/store/products/";
const jacketContainer = document.querySelector(".shop");

async function fetchJackets() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const jackets = json;

    jacketContainer.innerHTML = "";

    for (let i = 0; i < jackets.length; i++) {
      createHTML(jackets, i);
    }
  } catch (error) {
    console.log("This happened while trying to reach the API: " + error);
    jacketContainer.innerHTML = "This happened while trying to reach the API " + error;
  }
}

fetchJackets();

function createHTML(jackets, i) {
  jacketContainer.innerHTML += `<div class="shop-card">
                                  <h2>${jackets[i].name}</h2>
                                  <img src="${jackets[i].images[0].thumbnail}"></img>
                                  <p>${jackets[i].price_html}</p>
                                  <p>${jackets[i].short_description}</p>
                                  <div class="button-wrapper">
                                  <a class="button cta-button cta-button-small" href="/product.html?id=${jackets[i].id}">View</a>
                                  </div>
                                </div>`;
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
        <h2>Thank you for <br/>  your purchase!</h2>
        <p>We here at RainyDays are certain that you will <br/>  enjoy your new jacket for years and years to come!</p>
        <p>A confirmation email has been sent to <br/>  Coolerguys@coolmail.com.</p>
        <p>Another email will be sent when the jacket is shipped, <br/>  along with a tracking number so you can sit by <br/>  the door and wait as soon as it arrives.</p>
          
        
      </div>`;
}

function createLoadingHTML() {
  cart.innerHTML = `<img src="/images/loader.gif" />`;
}

function createEmptyCartHTML() {
  cart.innerHTML = `
    <div>
      <h1>Nothing to see here <i class="fa-solid fa-face-frown"></i></h1>
      <p>Press the button below to go to our shop!</p>
      <a class="button cta-button cta-button-small" href="shop.html">Shop</a>
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

const productContainer = document.querySelector(".product-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const productUrl = "https://mariuschristensen.one/my-first-api/wp-json/wc/store/products/" + id;
const title = document.querySelector("title");

async function fetchProducts() {
  try {
    const response = await fetch(productUrl);
    const json = await response.json();
    const productDetails = json;

    createProductHTML(productDetails);
    createTitle(productDetails);
  } catch (error) {
    console.log("This happened while trying to reach the API: " + error);
    productContainer.innerHTML = "This happened while trying to reach the API " + error;
  }
}

fetchProducts();

function createProductHTML(productDetails) {
  productContainer.innerHTML += `<h1>${productDetails.name}</h1>
                                <img src="${productDetails.images[0].thumbnail}"></img>
                                <p>${productDetails.price_html}</p>
                                <p>${productDetails.description}</p>
                                <button id="buy-btn" data-product-id="1" class="button cta-button cta-button-small">Add to cart</button>`;
}

function createTitle(productDetails) {
  title.textContent = productDetails.name;
}
