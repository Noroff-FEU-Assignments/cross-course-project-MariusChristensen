import { jacket } from "./components/jackets.js";

const cart = document.querySelector(".cart");
const openCart = document.querySelector(".open-cart");

openCart.addEventListener("click", () => {
  cart.showModal();
});

window.onclick = function (event) {
  if (event.target === cart) {
    cart.close();
  }
};

function createCartHTML() {
  cart.innerHTML += `<div>
                    <h1>Checkout</h1>
                    </div>
                    <div class="checkout-info">
                    <img src="${jacket.image}" />
                    <p>${jacket.name}</p>
                    <p>${jacket.price}</p>
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
                    <a href="/checkout-success.html"
                    ><input class="button cta-button cta-button-small cta-contact" type="submit" value="Purchase"
                    /></a>
                    </div>`;
}

createCartHTML();
